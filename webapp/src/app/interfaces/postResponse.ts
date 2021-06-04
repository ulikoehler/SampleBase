import {SampleSet} from './sampleSet'
import {Sample} from './sample'
import { _File } from './_file'

export interface PostResponse {
    status: String,
    error?: String,
    sampleSets?: [SampleSet],
    samples?: [Sample],
    files?: [_File]
}