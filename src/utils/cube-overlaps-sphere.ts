import {Point} from 'types'
import {addPoints} from './add-points'
import {multiplyPoint} from './multiply-point'
import {pointDistance} from './point-distance'

export const cubeOverlapsSphere = (lower: Point, upper: Point, r: number, c: Point) => {
  const half = 0.5
  const cubeHalfLength = (upper.x - lower.x) * half
  const cubeCenter = multiplyPoint(half, addPoints(lower, upper))
  const cubeCenterMinus = multiplyPoint(-1, cubeCenter)

  // Go coordinate system in center of cube
  const cLower = addPoints(lower, cubeCenterMinus)
  const cUpper = addPoints(upper, cubeCenterMinus)
  const cSphere = addPoints(c, cubeCenterMinus)

  const dimensions = ['x', 'y', 'z'] as ['x', 'y', 'z']

  // See Efficient Neighbor Search, page 2
  const condition1 = dimensions.every(dimension =>
    (cSphere[dimension] >= cLower[dimension] - r) && (cSphere[dimension] <= cUpper[dimension] + r) &&
    dimensions.filter(d => d !== dimension).every(otherDimension =>
      (cSphere[otherDimension] >= -cubeHalfLength) && (cSphere[otherDimension] <= +cubeHalfLength)))

  const cubeVertexes: Point[] = [
    cUpper,
    {x: cUpper.x, y: cUpper.y, z: -cUpper.z},
    {x: cUpper.x, y: -cUpper.y, z: cUpper.z},
    {x: -cUpper.x, y: cUpper.y, z: cUpper.z},
    {x: -cUpper.x, y: -cUpper.y, z: cUpper.z},
    {x: cUpper.x, y: -cUpper.y, z: -cUpper.z},
    {x: -cUpper.x, y: cUpper.y, z: -cUpper.z},
    {x: -cUpper.x, y: -cUpper.y, z: -cUpper.z},
  ]

  const condition2 = cubeVertexes.some(v => pointDistance(v, cSphere) <= r)

  return condition1 || condition2
}
