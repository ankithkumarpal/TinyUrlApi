const router = require("express").Router();
const redirectToLongUrl = require('../services/redirectToLongUrl');

router.get('/:tinyUrl', (req, res) => {
    redirectToLongUrl(req , res);
});

module.exports = router;