import {Vector3} from 'three'
import {Point} from 'types'

export const pointToVector3 = (p: Point) => new Vector3(p.x, p.y, p.z)
