import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
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
import {OrbitControls} from 'three-orbitcontrols-ts'
import {Udf} from 'types'
import {generateSpheres3dWithGrid} from 'utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    this.addControls()

    // region TODO TEST ONLY
    this.addSpheres()
    // endregion

    this.startRendering()
  }

  render = () => {this.renderer!.render(this.scene!, this.camera!)}

  private addSpheres() {
    const spheres = generateSpheres3dWithGrid({
      gridStep: 1, space: {lenx: 100, leny: 100, lenz: 100}, sphereRadii: [3], maxTryCount: 10,
    })

    const geometry = new SphereBufferGeometry(5, 32, 32)
    const material = new MeshBasicMaterial({color: 0x000, opacity: 0.5, transparent: true})

    for (const sphere of spheres) {
      const obj = new Mesh(geometry, material)
      obj.position.set(sphere.coord.x, sphere.coord.y, sphere.coord.z)
      this.scene!.add(obj)
    }
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

    this.controls = new OrbitControls(this.camera!)
    this.controls.rotateSpeed = 1.0
    this.controls.zoomSpeed = zoomSpeed
    this.controls.enableZoom = true
    // TODO: maybe outside angular
    this.controls.addEventListener('change', this.render)
  }
}
