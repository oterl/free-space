/* tslint:disable */
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import {
  Point,
  Udf,
} from 'types'
import {getCenter} from 'utils'

@Component({
  selector: 'results-panel',
  styleUrls: ['./results-panel.component.scss'],
  templateUrl: 'results-panel.component.html',
})
export class ResultsPanelComponent implements OnChanges {
  @Input() colorMap = new Map<Point, string>()
  @Input() clusters: Udf<Map<Point, Point[]>>

  displayedColumns: string[] = ['number', 'color', 'count', 'center']
  data: Array<{pointCount: number; center: Point; color: string}> = []

  get resultCount() {return this.clusters && this.clusters.size}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.colorMap || changes.clusters) {
      this.data = []

      if (!this.clusters) return

      for (const [core, points] of this.clusters!)
        this.data.push({
          center: getCenter(points),
          pointCount: points.length,
          color: this.colorMap.get(core) || '#fff',
        })
    }
  }

  pointToString(point: Point) {
    const x = point.x.toString().slice(0, 6)
    const y = point.y.toString().slice(0, 6)
    const z = point.z.toString().slice(0, 6)


    return `(${x}, ${y}, ${z})`
  }
}
