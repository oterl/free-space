import Rchain from 'ramda/es/chain'
import RindexBy from 'ramda/es/indexBy'
import {
  Point,
  Sphere,
} from 'types'
import {pointToString} from 'utils'
import {getSpherePoints} from 'utils/get-sphere-points'

type Args = {
  spheres: Sphere[];
  points: Point[];
  gridStep: number;
}

export const getVoidPoints = ({gridStep, points, spheres}: Args) => {
  const allSpherePointsMap = RindexBy(pointToString, Rchain(s => getSpherePoints(s, gridStep), spheres))

  return points.filter(p => !allSpherePointsMap[pointToString(p)])
}
