import {Point} from 'types'
import {addPoints} from './add-points'
import {createPoint} from './create-point'
import {multiplyPoint} from './multiply-point'

export const getCenter = (points: Point[]): Point => points.length === 0
  ? createPoint(0, 0, 0)
  : multiplyPoint(1 / points.length, points.reduce(addPoints))
