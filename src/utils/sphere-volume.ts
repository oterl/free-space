import {Sphere} from 'types'

// tslint:disable-next-line:no-magic-numbers
export const sphereVolume = ({r}: Sphere) => Math.PI * r * r * r * 4 / 3
