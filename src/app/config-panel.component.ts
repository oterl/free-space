import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import {Udf} from 'types'
import {initialConfig} from './initial-config'

@Component({
  selector: 'config-panel',
  styleUrls: ['./config-panel.component.scss'],
  templateUrl: 'config-panel.component.html',
})
export class ConfigPanelComponent {
  @Output() configChange = new EventEmitter()

  freeSpaceForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.freeSpaceForm = this.fb.group({
      // Space size config
      lenx: [0, [Validators.required, Validators.min(0)]],
      leny: [0, [Validators.required, Validators.min(0)]],
      lenz: [0, [Validators.required, Validators.min(0)]],
      // Sphere generation
      size: [0, [Validators.required]],
      maxTry: [0],
      maxCount: [0],
      // Clustering configuration
      step: [0, Validators.required],
      eps: [0, Validators.required],
      k: [0, Validators.required],
    })

    this.freeSpaceForm.setValue(initialConfig)
  }

  onApplyClick() {this.configChange.emit(this.freeSpaceForm.value)}
  onResetClick() {
    this.freeSpaceForm.setValue(initialConfig)
    this.configChange.emit(this.freeSpaceForm.value)
  }
}
