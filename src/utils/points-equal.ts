import {Point} from 'types'

export const pointsEqual = (p1: Point, p2: Point) => (p1.x === p2.x) && (p1.y === p2.y) && (p1.z === p2.z)
