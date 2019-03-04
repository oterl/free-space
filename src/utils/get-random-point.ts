import {
  Point,
  Space3d,
} from 'types'

const random = Math.random
const floor = Math.floor

export const getRandomPoint = (space: Space3d): Point => ({
  x: floor(random() * space.lenx),
  y: floor(random() * space.leny),
  z: floor(random() * space.lenz),
})
