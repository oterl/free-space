import {Octree} from 'd3-octree'
import {Point} from 'types'
import {findCorePoints} from 'utils'

type Args = {
  tree: Octree<Point>;
  points: Point[];
  eps: number;
  minPoints: number;
}

self.onmessage = ({data}: {data: Args}) => {
  postMessage(findCorePoints(data), undefined as any)
}
