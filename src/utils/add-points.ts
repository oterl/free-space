import {Point} from 'types'
import {createPoint} from './create-point'

export const addPoints = (p1: Point, p2: Point): Point => {
  const resultX = p1.x + p2.x
  const resultY = p1.y + p2.y
  const resultZ = p1.z + p2.z

  return createPoint(resultX, resultY, resultZ)
}
