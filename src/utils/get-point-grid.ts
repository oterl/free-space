import {
  Point,
  Space3d,
} from 'types'
import {createPoint} from './create-point'

type Args = {
  gridStep: number;
  space: Space3d;
}

export const getPointGrid = ({gridStep, space}: Args) => {
  // Number of points on respective axis
  const numX = Math.floor(space.lenx / gridStep)
  const numY = Math.floor(space.leny / gridStep)
  const numZ = Math.floor(space.lenz / gridStep)

  const result: Point[] = []

  for (let z = 0; z < numZ; z++)
    for (let y = 0; y < numY; y++)
      for (let x = 0; x < numX; x++)
        result.push(createPoint(x * gridStep, y * gridStep, z * gridStep))

  return result
}
