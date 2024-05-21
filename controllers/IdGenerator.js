const router = require("express").Router();

const SnowFlake = require('../SnowFlakeConfiguration/SnowFlake');
const IdGenerator = require('../services/IdGenerator');
const tinyUrl = require('../services/generateTinyUrl');

// Injecting SnowFlake class to IdGenerator class 
const snowFlake = new SnowFlake(1 , 1);
const idGenerator = new IdGenerator(snowFlake);

// routes 
router.post('/tiny-url', async (req, res) => {
    const id = await tinyUrl(idGenerator , req.body.longUrl);
    res.status(200).json({url : process.env.BASE_URL + "/" + id  , length : id.length});
});

module.exports = router;