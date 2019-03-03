import {Point} from 'types'

export const multiplyPoint = (n: number, p: Point): Point => ({x: p.x * n, y: p.y * n, z: p.z * n})
