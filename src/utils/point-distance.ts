import {Point} from 'types'

const sqrt = Math.sqrt
const pow2 = (num: number) => num * num

export const pointDistance = (p1: Point, p2: Point) =>
  sqrt(pow2(p1.x - p2.x) + pow2(p1.y - p2.y))
