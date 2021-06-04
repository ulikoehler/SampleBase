import {Material} from './material'
export interface SampleQuery {
    _id?: String,
    description?: String,
    associatedSamples?: [String],
    materials?: [ Material ],
    creationTimestamp?: String,
    lastEditedTimestamp?: String,
    measurements?: any
}