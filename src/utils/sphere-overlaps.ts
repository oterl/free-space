import Rcurry from 'ramda/es/curry'
import {Sphere} from 'types'
import {pointDistance} from 'utils'

export const sphereOverlaps = (s1: Sphere, s2: Sphere) =>
  pointDistance(s1.coord, s2.coord) < (s1.r + s2.r)

export const sphereOverlapsC = Rcurry(sphereOverlaps)
