import {SimplePoint} from 'types'

export const multiplySimplePoint = (n: number, p: SimplePoint): SimplePoint =>
  ({x: p.x * n, y: p.y * n, z: p.z * n})
