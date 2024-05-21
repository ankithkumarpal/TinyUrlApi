// models/leakBucket.js

const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    TinyUrl : {
        type: String,
        required: true,
        default: 5
    },
    LongUrl: {
        type: String,
        required: true,
        default: 5
    },
} ,  { timestamps: true });


mappingSchema.index({ LongUrl: 1, TinyUrl: 1 }, { unique: true });
const MappingSchema  = mongoose.model('MappingSchema', mappingSchema);

module.exports = MappingSchema;
