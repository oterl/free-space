import {
  Dimension,
  Point,
} from 'types'
import {addPoints} from './add-points'
import {multiplyPoint} from './multiply-point'
import {sphereContainsC} from './sphere-contains'

// TODO: Test this
// Maybe visually by randomly drawing a cube and sphere
export const cubeOverlapsSphere = (lower: Point, upper: Point, r: number, c: Point) => {
  const half = 0.5
  const cubeHalf = (upper.x - lower.x) * half
  const cubeCenter = multiplyPoint(half, addPoints(lower, upper))
  const cubeCenterMinus = multiplyPoint(-1, cubeCenter)

  // Go to coordinate system in the center of cube
  const cSphere = addPoints(c, cubeCenterMinus)

  const dimensions: Dimension[] = ['x', 'y', 'z']
  const otherDimensions = (from: Dimension) => dimensions.filter(d => d !== from)

  const condition1 = dimensions.every(
    dimension =>
      (cSphere[dimension] >= -cubeHalf - r) &&
      (cSphere[dimension] <= cubeHalf + r) &&
      otherDimensions(dimension).every(otherD => (cSphere[otherD] >= -cubeHalf) && (cSphere[otherD] <= cubeHalf)),
  )

  const cubeVertexes: Point[] = [
    {x: cubeHalf, y: cubeHalf, z: cubeHalf},
    {x: cubeHalf, y: cubeHalf, z: -cubeHalf},
    {x: cubeHalf, y: -cubeHalf, z: cubeHalf},
    {x: -cubeHalf, y: cubeHalf, z: cubeHalf},
    {x: -cubeHalf, y: -cubeHalf, z: cubeHalf},
    {x: cubeHalf, y: -cubeHalf, z: -cubeHalf},
    {x: -cubeHalf, y: cubeHalf, z: -cubeHalf},
    {x: -cubeHalf, y: -cubeHalf, z: -cubeHalf},
  ]

  const condition2 = cubeVertexes.some(sphereContainsC({coord: cSphere, r}))

  return condition1 || condition2
}
