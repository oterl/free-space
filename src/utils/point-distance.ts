import {SimplePoint} from 'types'

const sqrt = Math.sqrt
const pow2 = (num: number) => num * num

export const pointDistance = (p1: SimplePoint, p2: SimplePoint) =>
  sqrt(pow2(p1.x - p2.x) + pow2(p1.y - p2.y) + pow2(p1.z - p2.z))
