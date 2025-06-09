const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../data.sqlite3');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Tabulka majitelů
    db.run(`
        CREATE TABLE IF NOT EXISTS owners (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            phone TEXT
        )
    `);

    // Tabulka zvířat
    db.run(`
        CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            species TEXT NOT NULL,
            age INTEGER,
            description TEXT,
            adopted INTEGER,
            owner_id INTEGER,
            FOREIGN KEY (owner_id) REFERENCES owners(id)
        )
    `);

    // Tabulka očkování
    db.run(`
        CREATE TABLE IF NOT EXISTS vaccinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pet_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pets(id)
        )
    `);
});

module.exports = db;