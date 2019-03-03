import {Point} from 'types'

export const stringToPoint = (point: string): Point => {
  const [x, y, z] = point.split('-').map(Number)
  return {x, y, z}
}
