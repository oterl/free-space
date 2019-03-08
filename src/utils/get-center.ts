import {Point} from 'types'
import {addPoints} from 'utils/add-points'
import {multiplyPoint} from 'utils/multiply-point'

export const getCenter = (points: Point[]): Point => points.length === 0
  ? {z: 0, x: 0, y: 0}
  : multiplyPoint(1 / points.length, points.reduce(addPoints))
