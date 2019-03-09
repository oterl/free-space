import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import {defaultDbscanConfig} from 'const'
import {
  Geometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereBufferGeometry,
  WebGLRenderer,
} from 'three'
import OrbitControls from 'three-orbitcontrols'
import {
  DbscanConfig,
  Point,
  Sphere,
  Udf,
} from 'types'
import {randomColor} from 'utils'
import {pointToVector3} from 'utils/three'
import {DbscanService} from './dbscan.service'
import {renderingConfig} from './rendering-config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  private renderer: Udf<WebGLRenderer>
  private camera: Udf<PerspectiveCamera>
  scene: Udf<Scene>

  colorMap = new Map<Point, string>()
  clusters: Udf<Map<Point, Point[]>>
  controls: Udf<OrbitControls>
  isProcessing = true

  @ViewChild('canvas') private canvasRef: Udf<ElementRef>

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    if (!this.camera || !this.renderer) return

    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'

    this.camera.aspect = this.getAspectRatio()
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
    this.render()
  }

  get canvas(): HTMLCanvasElement {return this.canvasRef && this.canvasRef.nativeElement}

  constructor(private dbScanService: DbscanService) {
    this.dbScanService.result$.subscribe(({spheres, clusters}) => {
      this.clusters = clusters
      this.drawSpheres(spheres)
      this.drawClusters(clusters)
      this.render()
      this.isProcessing = false
    })
  }

  ngAfterViewInit() {
    this.createScene()
    this.createCamera()
    this.startRendering()
    this.addControls()
    this.dbScanService.run(defaultDbscanConfig)
  }

  render = () => {this.renderer!.render(this.scene!, this.camera!)}

  // region Draw spheres
  private drawnSpheres: Object3D[] = []
  private sphereMaterial = new MeshBasicMaterial({color: 0x000, opacity: 0.5, transparent: true})
  private removeSpheres() {
    if (this.drawnSpheres.length)
      for (const obj of this.drawnSpheres)
        this.scene!.remove(obj)
    this.drawnSpheres = []
  }
  private drawSpheres(spheres: Sphere[]) {
    this.removeSpheres()

    for (const sphere of spheres) {
      const sphereGeometry = new SphereBufferGeometry(
        sphere.r, renderingConfig.sphereSegments, renderingConfig.sphereSegments)
      const obj = new Mesh(sphereGeometry, this.sphereMaterial)
      this.drawnSpheres.push(obj)
      obj.position.set(sphere.coord.x, sphere.coord.y, sphere.coord.z)
      this.scene!.add(obj)
    }
  }
  // endregion

  // region Draw clusters
  private drawnClusters: Object3D[] = []
  private removeClusters() {
    if (this.drawnClusters.length)
      for (const obj of this.drawnClusters)
        this.scene!.remove(obj)

    this.drawnClusters = []
  }
  private drawClusters(clusters: Map<Point, Point[]>) {
    this.removeClusters()

    this.colorMap.clear()

    for (const [clusterCenter, clusterPoints] of clusters) {
      const color = randomColor()
      this.colorMap.set(clusterCenter, color)

      const pointMaterial = new PointsMaterial({
        size: 0.3,
        transparent: true,
        opacity: renderingConfig.pointOpacity,
        color,
      })

      const pointGeometry = new Geometry()
      pointGeometry.vertices.push(...clusterPoints.map(pointToVector3))
      const pointsObj = new Points(pointGeometry, pointMaterial)
      this.scene!.add(pointsObj)
      this.drawnClusters.push(pointsObj)
    }
  }
  // endregion

  private createScene() {this.scene = new Scene()}

  private createCamera() {
    const fieldOfView = 60
    const nearClippingPane = 1
    const farClippingPane = 1100
    const cameraX = 10
    const cameraY = 10
    const cameraZ = 100

    const aspectRatio = this.getAspectRatio()
    this.camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearClippingPane, farClippingPane)

    // Set position and look at
    this.camera.position.x = cameraX
    this.camera.position.y = cameraY
    this.camera.position.z = cameraZ
  }

  private getAspectRatio(): number {
    const height = this.canvas.clientHeight
    if (height === 0) return 0

    return this.canvas.clientWidth / this.canvas.clientHeight
  }

  private startRendering() {
    const white = 0xffffff

    this.renderer = new WebGLRenderer({canvas: this.canvas, antialias: true})
    this.renderer.setPixelRatio(devicePixelRatio)
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFSoftShadowMap
    this.renderer.setClearColor(white, 1)
    this.renderer.autoClear = true

    this.render()
  }

  addControls() {
    const zoomSpeed = 1.2

    this.controls = new OrbitControls(this.camera!, this.renderer!.domElement)
    this.controls.rotateSpeed = 1.0
    this.controls.zoomSpeed = zoomSpeed
    this.controls.addEventListener('change', this.render)
  }

  onConfigChange(config: DbscanConfig) {
    this.dbScanService.run(config)
    this.isProcessing = true
  }
}
