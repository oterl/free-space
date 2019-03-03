import {Octree} from 'd3-octree'
import {Point} from 'types'
import {getNeighbors} from '../get-neighbors'

type Args = {
  tree: Octree<Point>;
  points: Point[];
  eps: number;
  minPoints: number;
}

export const findCorePoints = ({points, eps, minPoints, tree}: Args) => {
  const result: Map<Point, Point[]> = new Map

  for (const point of points) {
    const neighbors = getNeighbors({point, eps, tree})
    if (neighbors.length < minPoints) continue
    result.set(point, neighbors)
  }

  return result
}
