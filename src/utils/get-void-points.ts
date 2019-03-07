import {octree} from 'd3-octree'
import Rchain from 'ramda/es/chain'
import RindexBy from 'ramda/es/indexBy'
import Rprop from 'ramda/es/prop'
import {
  Point,
  Sphere,
} from 'types'
import {
  getNeighbors,
  pointToString,
} from 'utils'

type Args = {
  spheres: Sphere[];
  points: Point[];
}

export const getVoidPoints = ({points, spheres}: Args) => {
  const tree = octree(points, Rprop('x'), Rprop('y'), Rprop('z'))

  const spherePoints = Rchain(s => getNeighbors({tree, eps: s.r, point: s.coord}), spheres)
  const spherePointMap = RindexBy(pointToString, spherePoints)

  return points.filter(p => !spherePointMap[pointToString(p)])
}
