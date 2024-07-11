const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    name: String,
    email: String,
    whatsapp: String, // Tambahkan field whatsapp di sini
    reportNumber: String,
    reportContent: String,
    response: String,
    reportTime: { type: Date, default: Date.now },
    isAnswered: { type: Boolean, default: false }
});

module.exports = mongoose.model('Report', reportSchema);
