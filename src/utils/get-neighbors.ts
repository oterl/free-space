import {
  Octree,
  OctreeInternalNode,
  OctreeLeaf,
} from 'd3-octree'
import {
  Point,
  Udf,
} from 'types'
import {cubeOverlapsSphere} from './cube-overlaps-sphere'
import {pointsEqual} from './points-equal'
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

    if (isLeaf(node)) {
      let testPoint: Udf<Point> = node.data
      // noinspection JSAssignmentUsedAsCondition
      do if (!pointsEqual(testPoint, point) && sphereContains({coord: point, r: eps}, testPoint)) result.push(testPoint)
      // tslint:disable-next-line:no-conditional-assignment
      while (testPoint = node.next && node.next.data)
    }
  })

  return result
}
