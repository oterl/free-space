import {Sphere} from 'types'
import {addPointsC} from './add-points'
import {getPointGrid} from './get-point-grid'
import {sphereContainsC} from './sphere-contains'

export const getSpherePoints = (sphere: Sphere, gridStep: number) => {
  const d = sphere.r + sphere.r
  return getPointGrid({gridStep, space: {lenx: d, leny: d, lenz: d}})
    .map(addPointsC(sphere.coord))
    .filter(sphereContainsC(sphere))
}
