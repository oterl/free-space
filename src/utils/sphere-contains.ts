import {
  SimplePoint,
  Sphere,
} from 'types'
import {pointDistance} from './point-distance'

export const sphereContains = (s: Sphere, coord: SimplePoint) => pointDistance(s.coord, coord) <= s.r
