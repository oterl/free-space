import {Sphere} from 'types'
import {sphereContainsC} from 'utils'
import {addPointsC} from 'utils/add-points'
import {getPointGrid} from 'utils/get-point-grid'

export const getSpherePoints = (sphere: Sphere, gridStep: number) => {
  const d = sphere.r + sphere.r
  return getPointGrid({gridStep, space: {lenx: d, leny: d, lenz: d}})
    .map(addPointsC(sphere.coord))
    .filter(sphereContainsC(sphere))
}
