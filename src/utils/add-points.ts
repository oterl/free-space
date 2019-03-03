import Rcurry from 'ramda/es/curry'
import {Point} from 'types'

export const addPoints = (p1: Point, p2: Point): Point =>
  ({x: p1.x + p2.x, y: p1.y + p2.y, z: p1.z + p2.z})

export const addPointsC = Rcurry(addPoints)
