import {Material} from './material'
export interface SampleSetQuery {
    _id?: String,
    description?: String,
    associatedSamples?: [String],
    materials?: [ Material ],
    creationTimestamp?: String,
    lastEditedTimestamp?: String
}