import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {Point} from 'types'
import {Sphere} from 'types/sphere'
import {DbscanConfig} from './dbscan-config'

const pathToWorker = 'assets/workers/main.js'

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
