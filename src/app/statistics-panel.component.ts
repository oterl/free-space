import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import {
  Dict,
  Statistics,
  Udf,
} from 'types'

@Component({
  selector: 'statistics-panel',
  styleUrls: ['./statistics-panel.component.scss'],
  templateUrl: 'statistics-panel.component.html',
})
export class StatisticsPanelComponent implements OnChanges {
  @Input() statistics: Udf<Statistics & Dict<number>>

  fieldNameMap: {[P in keyof Statistics]: string} & Dict<string> = {
    computationTime: 'Computation Time (seconds):',
    numberOfPoints: 'Number of Points:',
    spaceVolume: 'Space Volume:',
    sphereCount: 'Sphere Count:',
    sphereVolume: 'Volume of Spheres:',
    voidPoints: 'Void Points:',
    numberOfClusteredPoints: 'Number of Clustered Points;',
  }

  fields: Array<{key: string; value: number}> = []

  ngOnChanges(changes: SimpleChanges) {
    if (changes.statistics) {
      this.fields = []

      for (const key in this.statistics)
        this.fields.push({
          key: this.fieldNameMap[key],
          value: this.statistics[key],
        })
    }
  }
}
