import {Point} from 'types'
import {multiplyPoint} from 'utils'
import {addPoints} from 'utils/add-points'

export const cubeOverlapsSphere = (lower: Point, upper: Point, r: number, c: Point) => {
  const half = 0.5
  const cubeHalfLength = (upper.x - lower.x) * half
  const cubeCenter = multiplyPoint(half, addPoints(lower, upper))

  return (cubeCenter.x + cubeHalfLength + r) < c.x || (cubeCenter.x - cubeHalfLength - r) > c.x ||
         (cubeCenter.y + cubeHalfLength + r) < c.y || (cubeCenter.y - cubeHalfLength - r) > c.y ||
         (cubeCenter.z + cubeHalfLength + r) < c.z || (cubeCenter.z - cubeHalfLength - r) > c.z
}
