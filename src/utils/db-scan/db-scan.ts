import {octree} from 'd3-octree'
import Rprop from 'ramda/es/prop'
import {Point} from 'types'
import {findCorePoints} from './find-core-points'

type Args = {
  eps: number;
  points: Point[];
  minPoints: number;
}

export const dbScan = ({eps, minPoints, points}: Args) => {
  const tree = octree(points, Rprop('x'), Rprop('y'), Rprop('z'))
  const visited = new Set<Point>()
  const clusters = new Map<Point, Point[]>()

  const corePoints = findCorePoints({points, eps, minPoints, tree})
  const isCore = (point: Point) => corePoints.has(point)
  const isNotVisited = (point: Point) => !visited.has(point)

  const expandCore = (core: Point, cluster: Point[]) => {
    const neighbors = corePoints.get(core)!.filter(isNotVisited)
    for (const neighbor of neighbors) visited.add(neighbor)
    cluster.push(...neighbors)
    const neighborCores = neighbors.filter(isCore)
    for (const neighborCore of neighborCores) expandCore(neighborCore, cluster)
  }

  for (const corePoint of corePoints.keys()) {
    if (visited.has(corePoint)) continue
    visited.add(corePoint)
    const cluster = [corePoint]
    expandCore(corePoint, cluster)
    clusters.set(corePoint, cluster)
  }

  return clusters
}
