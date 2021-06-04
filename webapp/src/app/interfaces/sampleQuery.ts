import {Material} from './material'
export interface SampleQuery {
    _id?: String,
    materials?: [Material],
    description?: String,
    measurements?: any,
    files?: [String],
    creationTimestamp?: String,
    lastEditedTimestamp?: String
}