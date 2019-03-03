import {Component} from '@angular/core'
import {
  Geometry,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import {OrbitControls} from 'three-orbitcontrols-ts'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)
    const controls = new OrbitControls(camera)
    controls.enableZoom = true
    controls.zoomSpeed = 1.2

    const scene = new Scene()

    const material = new LineBasicMaterial({color: 0x0000ff})

    const geometry = new Geometry()
    geometry.vertices.push(new Vector3(-10, 0, 0))
    geometry.vertices.push(new Vector3(0, 10, 0))
    geometry.vertices.push(new Vector3(10, 0, 0))

    const line = new Line(geometry, material)

    scene.add(line)

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()
  }
}
