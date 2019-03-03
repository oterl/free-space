import Rcurry from 'ramda/es/curry'
import {
  Point,
  Sphere,
} from 'types'
import {sphereOverlaps} from 'utils'

export const sphereContains = (s: Sphere, coord: Point) => sphereOverlaps(s, {coord, r: 0})

export const sphereContainsC = Rcurry(sphereContains)
