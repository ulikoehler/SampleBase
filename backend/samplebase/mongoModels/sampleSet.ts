import mongoose = require("mongoose");
import {SampleSet} from '../interfaces/sampleSet'

interface SampleSetExtended extends SampleSet, mongoose.Document {_id: String};

const SampleSetSchema =  new mongoose.Schema({
    _id: {type: String, required: true},
    description: String,
    materials: [{
        code_DIN_EN_10027: {type: String, required: true},
        shortname__DIN_EN_10027: String,
        properties: String
    }], 
    associatedSamples: [String],
    creationTimestamp: String,
    lastEditedTimestamp: String
    
})

const SampleSetModel = mongoose.model<SampleSetExtended>('SampleSet', SampleSetSchema)

module.exports = {SampleSetModel: SampleSetModel}