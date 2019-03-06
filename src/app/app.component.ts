import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import {
  Mesh,
  MeshBasicMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereBufferGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'
import OrbitControls from 'three-orbitcontrols'
import {
  Space3d,
  Udf,
} from 'types'
import {generateNonOverlappingSpheres} from 'utils'
import {dbScan} from 'utils/db-scan'
import {getPointGrid} from 'utils/get-point-grid'
import {getVoidPoints} from 'utils/get-void-points'
import {randomColor} from 'utils/random-color'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private renderer: Udf<WebGLRenderer>
  private camera: Udf<PerspectiveCamera>
  private cameraTarget: Udf<Vector3>
  scene: Udf<Scene>

  controls: Udf<OrbitControls>

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

  ngAfterViewInit() {
    this.createScene()
    this.createLight()
    this.createCamera()

    // region TODO TEST ONLY
    this.addObjects()
    // endregion

    this.startRendering()
    this.addControls()
  }

  render = () => {this.renderer!.render(this.scene!, this.camera!)}

  private addObjects() {
    const space: Space3d = {lenx: 10, leny: 10, lenz: 10}
    const sphereRadius = 2
    const maxTryCount = 100
    const pointSize = 0.1

    // region Add Spheres
    const spheres = generateNonOverlappingSpheres({space, sphereRadii: [sphereRadius], maxTryCount})
    const sphereGeometry = new SphereBufferGeometry(sphereRadius, 32, 32)
    const sphereMaterial = new MeshBasicMaterial({color: 0x000, opacity: 0.5, transparent: true})
    for (const sphere of spheres) {
      const obj = new Mesh(sphereGeometry, sphereMaterial)
      obj.position.set(sphere.coord.x, sphere.coord.y, sphere.coord.z)
      this.scene!.add(obj)
    }
    // endregion

    // region Add Void points
    const gridStep = 1
    const points = getPointGrid({gridStep, space})
    const voidPoints = getVoidPoints({gridStep, spheres, points})

    const pointGeometry = new SphereBufferGeometry(pointSize, 5, 5)
    // endregion

    // region Db Scan
    const eps = 2
    const minPoints = 30

    const clusters = dbScan({minPoints, eps, points: voidPoints})
    for (const [clusterCenter, clusterPoints] of clusters) {
      const pointMaterial = new MeshBasicMaterial({color: randomColor(), opacity: 0.9, transparent: true})
      for (const point of clusterPoints) {
        const obj = new Mesh(pointGeometry, pointMaterial)
        obj.position.set(point.x, point.y, point.z)
        this.scene!.add(obj)
      }
    }
    // endregion
  }

  private createScene() {this.scene = new Scene()}

  private createLight() {
    const lightColor = 0xffffff
    const lightDistance = 1000
    const lightIntensity = 1000
    const lightCoordZ = 100

    const light1 = new PointLight(lightColor, lightIntensity, lightDistance)
    light1.position.set(0, 0, lightCoordZ)
    this.scene!.add(light1)

    const light2 = new PointLight(lightColor, lightIntensity, lightDistance)
    light2.position.set(0, 0, -lightCoordZ)
    this.scene!.add(light2)
  }

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
    this.controls.enableZoom = true
    // TODO: maybe outside angular
    this.controls.addEventListener('change', this.render)
  }
}
