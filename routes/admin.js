const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const bcrypt = require('bcryptjs');
const methodOverride = require('method-override');

// Middleware for method override
router.use(methodOverride('_method'));

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
    try {
        const reports = await Report.find({});
        res.render('admin', { reports });
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete report by ID
router.delete('/report/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json({ message: 'Report deleted successfully' });
    } catch (err) {
        console.error('Error deleting report:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/respond', async (req, res) => {
    const { reportId, response } = req.body;
    try {
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        report.response = response;
        report.isAnswered = true;
        await report.save();
        res.redirect('/admin');
    } catch (err) {
        console.error('Error responding to report:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
