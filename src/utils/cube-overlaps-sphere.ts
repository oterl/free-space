import {
  Dict,
  Dimension,
  SimplePoint,
} from 'types'
import {addSimplePoints} from './add-simple-points'
import {multiplySimplePoint} from './multiply-simple-point'
import {sphereContains} from './sphere-contains'

export const cubeOverlapsSphere = (lower: SimplePoint, upper: SimplePoint, r: number, c: SimplePoint) => {
  const half = 0.5
  const cubeHalf = (upper.x - lower.x) * half
  const cubeCenter = multiplySimplePoint(half, addSimplePoints(lower, upper))
  const cubeCenterMinus = multiplySimplePoint(-1, cubeCenter)

  // Go to coordinate system in the center of cube
  const cSphere = addSimplePoints(c, cubeCenterMinus)

  const dimensions: Dimension[] = ['x', 'y', 'z']
  const otherDimensions: Dict<Dimension[]> = {
    x: ['y', 'z'],
    y: ['x', 'z'],
    z: ['x', 'y'],
  }

  const condition1 = dimensions.some(
    dimension =>
      (cSphere[dimension] >= -cubeHalf - r) &&
      (cSphere[dimension] <= cubeHalf + r) &&
      otherDimensions[dimension].every(otherD => (cSphere[otherD] >= -cubeHalf) && (cSphere[otherD] <= cubeHalf)),
  )

  const cubeVertexes: SimplePoint[] = [
    {x: cubeHalf, y: cubeHalf, z: cubeHalf},
    {x: cubeHalf, y: cubeHalf, z: -cubeHalf},
    {x: cubeHalf, y: -cubeHalf, z: cubeHalf},
    {x: -cubeHalf, y: cubeHalf, z: cubeHalf},
    {x: -cubeHalf, y: -cubeHalf, z: cubeHalf},
    {x: cubeHalf, y: -cubeHalf, z: -cubeHalf},
    {x: -cubeHalf, y: cubeHalf, z: -cubeHalf},
    {x: -cubeHalf, y: -cubeHalf, z: -cubeHalf},
  ]

  const condition2 = cubeVertexes.some(s => sphereContains({coord: cSphere, r}, s))

  return condition1 || condition2
}
