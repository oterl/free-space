import {
  Octree,
  OctreeInternalNode,
  OctreeLeaf,
} from 'd3-octree'
import {Point} from 'types'
import {cubeOverlapsSphere} from './cube-overlaps-sphere'
import {sphereContains} from './sphere-contains'

type Args = {
  eps: number;
  point: Point;
  tree: Octree<Point>;
}

const isLeaf = (node: OctreeInternalNode<Point> | OctreeLeaf<Point>): node is OctreeLeaf<Point> => !node.length

export const getNeighbors = ({tree, eps, point}: Args) => {
  const result: Point[] = []

  tree.visit((node, x0, y0, z0, x1, y1, z1) => {
    if (!cubeOverlapsSphere({x: x0, y: y0, z: z0}, {x: x1, y: y1, z: z1}, eps, point)) return true

    if (isLeaf(node))
      for (let testPoint = node.data; node.next; testPoint = node.next.data)
        if (sphereContains({coord: point, r: eps}, testPoint)) result.push(testPoint)
  })

  return result
}
