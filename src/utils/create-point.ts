import {Point} from 'types'

let counter = 1

export const createPoint = (x: number, y: number, z: number): Point =>
  // tslint:disable-next-line:prefer-template
  ({id: counter++, x, y, z})
