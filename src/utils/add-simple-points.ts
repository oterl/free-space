import {SimplePoint} from 'types'

export const addSimplePoints = (p1: SimplePoint, p2: SimplePoint): SimplePoint => {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
    z: p1.z + p2.z,
  }
}
