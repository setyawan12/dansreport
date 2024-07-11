const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const path = require('path');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../views', 'index')); // Gunakan path absolut atau relatif yang benar
});

module.exports = router;