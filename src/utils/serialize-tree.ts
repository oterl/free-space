import {Octree} from 'd3-octree'
import Rpick from 'ramda/es/pick'
import {
  Point,
  SerializedTree,
} from 'types'

export const serializeTree: (tree: Octree<Point>) => SerializedTree =
  Rpick(['_x0', '_y0', '_z0', '_x1', '_y1', '_z1', '_root'])
