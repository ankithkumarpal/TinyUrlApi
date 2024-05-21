
const  toBase62 = require('./base62Conversion');
const MappingSchema = require('../models/urlMappingSchema');

const tinyUrl = async (IdGenerator , longUrl) => {
    try {
        const generatedId = await IdGenerator.getNextId();
        const base62 = toBase62(generatedId);

        const IsLongUrlExists = await MappingSchema.findOne({ LongUrl: longUrl });
        if(IsLongUrlExists) {
            console.log("already exists in database.....");
            return IsLongUrlExists.TinyUrl;
        }

        const  mappingSchema = new MappingSchema({
            Id : generatedId,
            TinyUrl  : base62,
            LongUrl : longUrl 
        })

        await mappingSchema.save();

        return base62;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to generate TinyURL');
    }
}

module.exports = tinyUrl;