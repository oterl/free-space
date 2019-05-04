import {Point} from 'types'
import {createPoint} from './create-point'

export const multiplyPoint = (n: number, p: Point): Point =>
  createPoint(p.x * n, p.y * n, p.z * n)
