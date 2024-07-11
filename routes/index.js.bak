const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const path = require('path');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const reports = await Report.find({});
        res.render('index', { reports });  // Pastikan 'index' sesuai dengan nama file view
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;