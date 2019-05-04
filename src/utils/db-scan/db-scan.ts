import Rkeys from 'ramda/es/keys'
import {
  CorePoints,
  Dict,
  Point,
} from 'types'

export const dbScan = (corePoints: CorePoints) => {
  const visited: Dict<boolean> = {}
  const clusters = new Map<Point, Point[]>()

  const isCore = (point: Point) => corePoints[point.id]
  const isVisited = (point: Point) => visited[point.id]
  const isNotVisited = (point: Point) => !visited[point.id]
  const addToVisited = (point: Point) => visited[point.id] = true

  const expandCore = (corePointId: number, cluster: Point[]) => {
    const neighbors = corePoints[corePointId].neighbors!.filter(isNotVisited)
    for (const neighbor of neighbors) addToVisited(neighbor)
    cluster.push(...neighbors)
    const neighborCores = neighbors.filter(isCore)
    for (const neighborCore of neighborCores)
      expandCore(neighborCore.id, cluster)
  }

  for (const corePointId of Rkeys(corePoints)) {
    const corePoint = corePoints[corePointId].core
    if (isVisited(corePoint)) continue
    addToVisited(corePoint)
    const cluster = [corePoint]
    expandCore(corePointId, cluster)
    clusters.set(corePoint, cluster)
  }

  return clusters
}
