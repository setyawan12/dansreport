const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const Report = require("./models/report");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: 'sessions'
        })
    }),
);

// Routes
const indexRoutes = require("./routes/index");
const reportRoutes = require("./routes/report");
const adminRoutes = require("./routes/admin");

app.use("/", indexRoutes);
app.use("/report", reportRoutes);
app.use("/admin", adminRoutes);

// Set up mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Export the app (this is crucial for Vercel)
module.exports = app;

// Only listen if not in test environment (Vercel handles listening)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
