import {Point} from 'types'
import {addPoints} from './add-points'
import {multiplyPoint} from './multiply-point'

export const cubeOverlapsSphere = (lower: Point, upper: Point, r: number, c: Point) => {
  const half = 0.5
  const cubeHalfLength = (upper.x - lower.x) * half
  const cubeCenter = multiplyPoint(half, addPoints(lower, upper))

  return (cubeCenter.x + cubeHalfLength + r) < c.x || (cubeCenter.x - cubeHalfLength - r) > c.x ||
         (cubeCenter.y + cubeHalfLength + r) < c.y || (cubeCenter.y - cubeHalfLength - r) > c.y ||
         (cubeCenter.z + cubeHalfLength + r) < c.z || (cubeCenter.z - cubeHalfLength - r) > c.z
}
