import {octree} from 'd3-octree'
import Rprop from 'ramda/es/prop'
import RsplitEvery from 'ramda/es/splitEvery'
import {
  CorePoints,
  DbscanConfig,
  Point,
  Space3d,
} from 'types'
import {
  dbScan,
  FindCorePointsArgs,
  generateNonOverlappingSpheres,
} from 'utils'
import {getPointGrid} from 'utils/get-point-grid'
import {getVoidPoints} from 'utils/get-void-points'

const defaultConcurrency = 4
const coreFinderScriptPath = '/assets/workers/dbscan-core-finder.js'

const getCoresAsync = (args: FindCorePointsArgs) => new Promise<CorePoints>(resolve => {
  const worker = new Worker(coreFinderScriptPath)
  worker.postMessage(args)
  worker.addEventListener('message', event => resolve(event.data))
})

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
  const tree = octree(points, Rprop('x'), Rprop('y'), Rprop('z'))

  const maxThreads = navigator.hardwareConcurrency || defaultConcurrency
  const voidPartSize = Math.ceil(voidPoints.length / maxThreads)
  const voidParts = RsplitEvery(voidPartSize, voidPoints)

  const corePoints$ = Promise.all(
    voidParts.map(voidPartPoints => getCoresAsync({eps, minPoints, points: voidPartPoints, tree})),
  ).then((cores: CorePoints[]) =>
    cores.reduce((all, core) => {
      for (const [key, value] of core) all.set(key, value)
      return all
    }, new Map<Point, Point[]>()))

  const clusters$ = corePoints$.then(corePoints => dbScan({corePoints}))

  clusters$.then(clusters => postMessage({clusters}, undefined as any))
}
