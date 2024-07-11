const express = require('express');
const router = express.Router();
const Report = require('../models/report');

router.get('/', async (req, res) => {
    const reports = await Report.find({});
    res.render('index', { reports });
});

module.exports = router;
