import {Sphere} from 'types'
import {addPoints} from './add-points'
import {getPointGrid} from './get-point-grid'
import {sphereContains} from './sphere-contains'

export const getSpherePoints = (sphere: Sphere, gridStep: number) => {
  const d = sphere.r + sphere.r
  return getPointGrid({gridStep, space: {lenx: d, leny: d, lenz: d}})
    .map(p => addPoints(sphere.coord, p))
    .filter(l => sphereContains(sphere, l))
}
