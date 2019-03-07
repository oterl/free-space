import {Sphere} from 'types'
import {pointDistance} from './point-distance'

export const sphereOverlaps = (s1: Sphere, s2: Sphere) =>
  pointDistance(s1.coord, s2.coord) < (s1.r + s2.r)
