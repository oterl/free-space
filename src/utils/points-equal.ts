import {SimplePoint} from 'types'

export const pointsEqual = (p1: SimplePoint, p2: SimplePoint) =>
  (p1.x === p2.x) && (p1.y === p2.y) && (p1.z === p2.z)
