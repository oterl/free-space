import {
  Octree,
  octree,
} from 'd3-octree'
import Rprop from 'ramda/es/prop'
import {
  Point,
  SerializedTree,
} from 'types'

export const deserializeTree = (data: SerializedTree): Octree<Point> => {
  const tree = octree<Point>([], Rprop('x'), Rprop('y'), Rprop('z'))

  Object.assign(tree, data)

  return tree
}
