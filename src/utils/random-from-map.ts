import Rkeys from 'ramda/es/keys'
import {Dict} from 'types'
import {randomFromArray} from 'utils'

export const randomFromMap = <T>(obj: Dict<T>) => obj[randomFromArray(Rkeys(obj))]
