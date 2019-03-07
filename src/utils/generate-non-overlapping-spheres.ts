import {
  Space3d,
  Sphere,
} from 'types'
import {sphereOverlaps} from 'utils/sphere-overlaps'
import {getRandomPoint} from './get-random-point'
import {randomFromArray} from './random-from-array'

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
  const checkMaxCount = () => maxCount ? (resultSpheres.length <= maxCount - 1) : true
  const checkFailed = () => failedCount <= maxTryCount
  // endregion

  while (checkMaxCount() && checkFailed()) {
    // Generate random sphere considering available points
    const sphere: Sphere = {coord: getRandomPoint(space), r: randomRadius()}

    if (resultSpheres.some(s => sphereOverlaps(sphere, s))) failedCount++
    else {
      resultSpheres.push(sphere)
      failedCount = 0
    }
  }

  return resultSpheres
}
