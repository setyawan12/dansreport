const express = require("express");
const router = express.Router();
const Report = require("../models/report");

router.get("/", (req, res) => {
    res.render("report");
});

router.post("/", async (req, res) => {
    const { name, email, whatsapp, reportContent } = req.body;
    const newReport = new Report({
        name,
        email,
        whatsapp,
        reportNumber: Math.random().toString(36).substr(2, 9),
        reportContent,
    });
    await newReport.save();
    res.redirect("/");
});

module.exports = router;
