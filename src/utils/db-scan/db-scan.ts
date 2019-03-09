import {
  CorePoints,
  Point,
} from 'types'

type Args = {corePoints: CorePoints}

export const dbScan = ({corePoints}: Args) => {
  const visited = new Set<Point>()
  const clusters = new Map<Point, Point[]>()

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
