const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const moment = require('moment-timezone'); // Tambahkan ini

router.get('/', async (req, res) => {
    const reports = await Report.find({});
    const formattedReports = reports.map(report => ({
        ...report.toObject(),
        reportTime: moment(report.reportTime).tz('Asia/Jakarta').format('DD/MM/YYYY, h:mm:ss A') // Format waktu WIB
    }));
    res.render('index', { reports: formattedReports });
});

module.exports = router;