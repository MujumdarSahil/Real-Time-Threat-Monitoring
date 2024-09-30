const express = require('express');
const router = express.Router();
const fetchThreatData = require('../data/threatFeed');

router.get('/threats', async (req, res) => {
    const data = await fetchThreatData();
    res.json(data);
});

module.exports = router;
