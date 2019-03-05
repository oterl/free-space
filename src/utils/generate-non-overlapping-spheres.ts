import {
  Space3d,
  Sphere,
} from 'types'
import {getRandomPoint} from './get-random-point'
import {randomFromArray} from './random-from-array'
import {sphereOverlapsC} from './sphere-overlaps'

type Args = {
  sphereRadii: number[];
  space: Space3d;
  maxCount?: number;
  maxTryCount: number;
}

export const generateNonOverlappingSpheres = (args: Args): Sphere[] => {
  const {sphereRadii, space, maxCount, maxTryCount} = args

  // region State
  const resultSpheres: Sphere[] = []
  let failedCount = 0
  // endregion

  // region Utils
  const randomRadius = () => randomFromArray(sphereRadii)
  const checkMaxCount = () => maxCount ? (resultSpheres.length <= maxCount) : true
  const checkFailed = () => failedCount <= maxTryCount
  // endregion

  while (checkMaxCount() && checkFailed()) {
    // Generate random sphere considering available points
    const sphere: Sphere = {coord: getRandomPoint(space), r: randomRadius()}

    if (resultSpheres.some(sphereOverlapsC(sphere))) failedCount++
    else {
      resultSpheres.push(sphere)
      failedCount = 0
    }
  }

  return resultSpheres
}
