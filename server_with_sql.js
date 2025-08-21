require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = process.env.PORT || 5500;
const session = require('express-session');

// const registration = require('./routes/registration');

// Setup DB connection
const db = new sqlite3.Database("./app.db", (err) => {
    if (err) {
        console.error("Failed to connect to database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});


// Read and apply SQL schema from app_tables.sql
(async () => {
    try {
        const sql = await fs.readFile("./create_tables.sql", "utf8");
        db.exec(sql, (err) => {
            if (err) {
                console.error("Failed to create tables:", err.message);
            } else {
                console.log("Tables created or already exist.");
            }
        });
    } catch (err) {
        console.error("Error reading SQL file:", err.message);
    }
})();

app.use(session({
    secret: 'your-secret-key',       // required
    resave: false,                   // don't save session if unmodified
    saveUninitialized: true,         // save new but empty sessions
    cookie: {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
        secure: false, // true only if you're using HTTPS
        sameSite: 'lax', // or 'none' if cross-site with credentials
    }
}));

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Received request for: ${req.url}`);
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'file_storage')));


// app.use('/', registration);


// Start the server
app.listen(PORT, () => {
    console.log(`Jack: I'm good on port ${PORT}`);
});
