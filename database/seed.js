const db = require('./db/database');

const vzorky = [
    { name: 'Granule pro psy', description: 'Velké balení, značka Chappi' },
    { name: 'Kočičí stelivo', description: 'Přírodní, 10 kg' },
    { name: 'Vodítko', description: 'Červené, délka 2m' }
];

db.serialize(() => {
    db.run('DELETE FROM items');
    const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
    vzorky.forEach(polozka => stmt.run(polozka.name, polozka.description));
    stmt.finalize(() => {
        console.log('Databáze byla naplněna ukázkovými daty.');
        db.close();
    });
});