import {Octree} from 'd3-octree'
import {
  CorePoints,
  Point,
} from 'types'
import {getNeighbors} from '../get-neighbors'

export type FindCorePointsArgs = {
  tree: Octree<Point>;
  points: Point[];
  eps: number;
  minPoints: number;
}

export const findCorePoints = ({points, eps, minPoints, tree}: FindCorePointsArgs) => {
  const result: CorePoints = new Map

  for (const point of points) {
    const neighbors = getNeighbors({point, eps, tree})
    if (neighbors.length < minPoints) continue
    result.set(point, neighbors)
  }

  return result
}
