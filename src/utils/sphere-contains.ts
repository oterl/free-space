import {
  Point,
  Sphere,
} from 'types'
import {pointDistance} from './point-distance'

export const sphereContains = (s: Sphere, coord: Point) => pointDistance(s.coord, coord) <= s.r
