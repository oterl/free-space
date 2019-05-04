import {SimplePoint} from './simple-point'

export type Point = SimplePoint & {
  // For easy point identification and comparison
  // reference comparison can not be used because
  // web worker copies data
  id: number;
}
