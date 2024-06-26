
const MappingSchema = require('../models/urlMappingSchema');

const redirectToLongUrl = async (req , res) => {
    const tinyUrl = req.url.split('/').pop();
    try {
        const mapping = await MappingSchema.findOne({ TinyUrl: tinyUrl });
        if (mapping) {
            let longUrl = mapping.LongUrl;
            if (!longUrl.startsWith("https://")) {
                longUrl = "https://" + longUrl;
            }
            res.redirect(longUrl);
        } else {
            res.status(404).send('Address Not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = redirectToLongUrl;
