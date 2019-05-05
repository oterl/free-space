import {Point} from './point'
import {Sphere} from './sphere'

export type ClusteringResult = {
  clusters: Map<Point, Point[]>;
  spheres: Sphere[];
  numberOfPoints: number;
  numberOfVoidPoints: number;
  spaceVolume: number;
}
