import {Material} from './material'
import {_File} from './_file'
export interface Sample {
    _id: String,
    materials?: [Material],
    description?: String,
    measurements?: 
    [
        {
            measurment: String,
            measurement_identifier: String,
            measurement_value: Number,
            measurement_value_unit: String,
        }
    ],
    status?: String,
    files?: [_File],
    creationTimestamp?: String,
    lastEditedTimestamp?: String
}