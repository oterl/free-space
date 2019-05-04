import {
  Point,
  Space3d,
} from 'types'
import {createPoint} from './create-point'

const random = Math.random
const floor = Math.floor

export const getRandomPoint = (space: Space3d): Point => {
  const ranX = floor(random() * space.lenx)
  const ranY = floor(random() * space.leny)
  const ranZ = floor(random() * space.lenz)

  return createPoint(ranX, ranY, ranZ)
}
