import {Component} from '@angular/core'
import {
  FormBuilder,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'top-bar',
  styleUrls: ['./top-bar.component.scss'],
  templateUrl: 'top-bar.component.html',
})
export class TopBarComponent {
  initialSpace = 10
  initialMaxTry = 100
  initialStep = 1
  initialEps = 2
  initialK = 20
  initialSphereSize = 5
  initialMaxSphereCount = 1000

  freeSpaceForm = this.fb.group({
    // Space size config
    lenx: [this.initialSpace, [Validators.required, Validators.min(0)]],
    leny: [this.initialSpace, [Validators.required, Validators.min(0)]],
    lenz: [this.initialSpace, [Validators.required, Validators.min(0)]],
    // Sphere generation
    size: [this.initialSphereSize, [Validators.required]],
    maxTry: [this.initialMaxTry],
    maxCount: [this.initialMaxSphereCount],
    // Clustering configuration
    step: [this.initialStep, Validators.required],
    eps: [this.initialEps, Validators.required],
    k: [this.initialK, Validators.required],
  })

  constructor(private fb: FormBuilder) {}
}
