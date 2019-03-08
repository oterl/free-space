import {Space3d} from 'types'
import {
  dbScan,
  generateNonOverlappingSpheres,
} from 'utils'
import {getPointGrid} from 'utils/get-point-grid'
import {getVoidPoints} from 'utils/get-void-points'
import {DbscanConfig} from '../app/dbscan-config'

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

  const clusters = dbScan({minPoints, eps, points: voidPoints})

  postMessage({clusters, spheres}, undefined as any)
}
