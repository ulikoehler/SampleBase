import mongoose = require("mongoose");
import {Sample} from '../interfaces/sample'

interface SampleExtended extends Sample, mongoose.Document {_id: String};

const SampleSchema =  new mongoose.Schema({
    _id: {type: String, required: true},
    description: String,
    measurements: Object,
    materials: [{
        code_DIN_EN_10027: {type: String, required: true},
        shortname__DIN_EN_10027: String,
        properties: String
    }], 
    files: [Object],
    creationTimestamp: String,
    lastEditedTimestamp: String,
    status: String    
})

const SampleModel = mongoose.model<SampleExtended>('Sample', SampleSchema)

module.exports = {SampleModel: SampleModel}