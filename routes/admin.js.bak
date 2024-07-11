const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const bcrypt = require('bcryptjs');

// Dummy login route for simplicity
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'dnsz18' && password === 'akusukakamu') {
        req.session.admin = true;
        res.redirect('/admin');
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/', async (req, res) => {
    if (!req.session.admin) {
        return res.redirect('/admin/login');
    }
    const reports = await Report.find({});
    res.render('admin', { reports });
});

router.post('/respond', async (req, res) => {
    const { reportId, response } = req.body;
    const report = await Report.findById(reportId);
    report.response = response;
    report.isAnswered = true;
    await report.save();
    res.redirect('/admin');
});

module.exports = router;
