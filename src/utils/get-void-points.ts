import Rchain from 'ramda/es/chain'
import Romit from 'ramda/es/omit'
import {
  Dict,
  Point,
  Sphere,
} from 'types'
import {pointToString} from 'utils'
import {getSpherePoints} from 'utils/get-sphere-points'

type Args = {
  spheres: Sphere[];
  pointMap: Dict<Point>;
  gridStep: number;
}

// pointMap contains indexed points of space grid
export const getVoidPoints = ({gridStep, pointMap, spheres}: Args) => {
  const allSpheresPoints = Rchain(s => getSpherePoints(s, gridStep), spheres).map(pointToString)
  return Romit(allSpheresPoints, pointMap)
}
