import {Point} from './point'

export type CorePoints = {[pointId: number]: {core: Point; neighbors: Point[]}}
