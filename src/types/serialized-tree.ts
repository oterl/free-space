import {OctreeInternalNode} from 'd3-octree'
import {Point} from 'types'

export type SerializedTree = {
  _x0: number;
  _y0: number;
  _z0: number;
  _x1: number;
  _y1: number;
  _z1: number;
  _root: OctreeInternalNode<Point>;
}
