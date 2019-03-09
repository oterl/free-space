import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {
  DbscanConfig,
  Point,
  Sphere,
} from 'types'

const pathToWorker = 'assets/workers/dbscan.js'

@Injectable({providedIn: 'root'})
export class DbscanService {
  result$ = new Subject<{clusters: Map<Point, Point[]>; spheres: Sphere[]}>()
  private worker: Worker

  constructor() {
    this.worker = new Worker(pathToWorker)
    this.worker.onmessage = event => this.result$.next(event.data)
  }

  run = (config: DbscanConfig) => this.worker.postMessage(config)
}
