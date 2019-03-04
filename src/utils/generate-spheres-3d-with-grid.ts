import RindexBy from 'ramda/es/indexBy'
import Rkeys from 'ramda/es/keys'
import Romit from 'ramda/es/omit'
import {
  Space3d,
  Sphere,
} from 'types'
import {getPointGrid} from './get-point-grid'
import {getSpherePoints} from './get-sphere-points'
import {pointToString} from './point-to-string'
import {randomFromArray} from './random-from-array'
import {randomFromMap} from './random-from-map'
import {sphereOverlapsC} from './sphere-overlaps'

type Args = {
  sphereRadii: number[];
  space: Space3d;
  maxCount?: number;
  gridStep: number;
  maxTryCount: number;
}

export const generateSpheres3dWithGrid = (args: Args): Sphere[] => {
  const {sphereRadii, space, gridStep, maxCount, maxTryCount} = args

  // region State
  const resultSpheres: Sphere[] = []
  // Sphere center can be located only on grid lines intersection
  const availableCenters = getPointGrid({gridStep, space})
  let availableMap = RindexBy(pointToString, availableCenters)
  let failedCount = 0
  // endregion

  // region Utils
  const randomRadius = () => randomFromArray(sphereRadii)
  const randomFromAvailable = () => randomFromMap(availableMap)
  const checkAvailable = () => Boolean(Rkeys(availableMap).length)
  const checkMaxCount = () => maxCount ? (resultSpheres.length <= maxCount) : true
  const checkFailed = () => failedCount <= maxTryCount
  // endregion

  while (checkAvailable() && checkMaxCount() && checkFailed()) {
    // Generate random sphere considering available points
    const sphere: Sphere = {coord: randomFromAvailable(), r: randomRadius()}

    if (resultSpheres.some(sphereOverlapsC(sphere))) {
      failedCount++
      continue
    }

    resultSpheres.push(sphere)
    // Exclude points that belong to generated sphere
    availableMap = Romit(getSpherePoints(sphere, gridStep).map(pointToString), availableMap)
  }

  return resultSpheres
}
