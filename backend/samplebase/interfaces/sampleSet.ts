import {Material} from './material'

export interface SampleSet {
    _id: String,
    description: String,
    associatedSamples: [String],
    materials: [ Material ],
    creationTimestamp: String,
    lastEditedTimestamp: String
}
