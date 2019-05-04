import {
  Point,
  SerializedTree,
} from 'types'
import {
  deserializeTree,
  findCorePoints,
} from 'utils'

type Args = {
  tree: SerializedTree;
  points: Point[];
  eps: number;
  minPoints: number;
}

self.onmessage = ({data}: {data: Args}) => {
  postMessage(
    findCorePoints({
      eps: data.eps,
      minPoints: data.minPoints,
      points: data.points,
      tree: deserializeTree(data.tree)}),
    undefined as any,
  )
}
