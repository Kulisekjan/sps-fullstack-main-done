const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../data.sqlite3');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            jmeno TEXT NOT NULL,
            druh TEXT NOT NULL,
            vek INTEGER,
            popis TEXT,
            adoptovano INTEGER DEFAULT 0
        )
    `);
});

module.exports = db;