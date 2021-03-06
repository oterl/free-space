import {octree} from 'd3-octree'
import Rprop from 'ramda/es/prop'
import RsplitEvery from 'ramda/es/splitEvery'
import {
  ClusteringResult,
  CorePoints,
  DbscanConfig,
  Space3d,
} from 'types'
import {
  dbScan,
  generateNonOverlappingSpheres,
  getPointGrid,
  getVoidPoints,
  serializeTree,
} from 'utils'

const defaultConcurrency = 4
const coreFinderScriptPath = '/assets/workers/dbscan-core-finder.js'

self.onmessage = ({data}: {data: DbscanConfig}) => {
  const space: Space3d = {lenx: data.lenx, leny: data.leny, lenz: data.lenz}
  const sphereRadius = data.size
  const maxTryCount = data.maxTry
  const eps = data.eps
  const minPoints = data.k

  const spheres = generateNonOverlappingSpheres(
    {space, sphereRadii: [sphereRadius], maxTryCount, maxCount: data.maxCount})

  const gridStep = data.step
  const points = getPointGrid({gridStep, space})
  const voidPoints = getVoidPoints({spheres, points})
  const tree = octree(voidPoints, Rprop('x'), Rprop('y'), Rprop('z'))

  const maxThreads = navigator.hardwareConcurrency || defaultConcurrency
  const voidPartSize = Math.ceil(voidPoints.length / maxThreads)
  const voidParts = RsplitEvery(voidPartSize, voidPoints)

  const corePoints$ = Promise.all(
    voidParts.map(voidPartPoints => new Promise<CorePoints>(resolve => {
      const worker = new Worker(coreFinderScriptPath)
      worker.postMessage({eps, minPoints, points: voidPartPoints, tree: serializeTree(tree)})
      worker.addEventListener('message', event => resolve(event.data))
    })),
  ).then((cores: CorePoints[]) =>
    cores.reduce((all, core) => ({...all, ...core}), {}))

  const clusters$ = corePoints$.then(dbScan)

  clusters$.then(clusters => postMessage({
    clusters,
    spheres,
    numberOfPoints: points.length,
    numberOfVoidPoints: voidPoints.length,
    spaceVolume: data.lenx * data.leny * data.lenz,
  } as ClusteringResult, undefined as any))
}
