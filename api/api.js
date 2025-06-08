const express = require('express');
const db = require('../database/db');
const router = express.Router();

// Výpis všech zvířat
router.get('/', (req, res) => {
    db.all('SELECT * FROM animals', (err, radky) => {
        if (err) return res.status(500).json({ chyba: err.message });
        res.json(radky);
    });
});

// Vytvoření nového zvířete
router.post('/', (req, res) => {
    const { jmeno, druh, vek, popis, adoptovano } = req.body;
    db.run(
        'INSERT INTO animals (jmeno, druh, vek, popis, adoptovano) VALUES (?, ?, ?, ?, ?)',
        [jmeno, druh, vek, popis, adoptovano ? 1 : 0],
        function (err) {
            if (err) return res.status(500).json({ chyba: err.message });
            res.status(201).json({ id: this.lastID, jmeno, druh, vek, popis, adoptovano });
        }
    );
});

// Detail jednoho zvířete
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM animals WHERE id = ?', [req.params.id], (err, radek) => {
        if (err) return res.status(500).json({ chyba: err.message });
        if (!radek) return res.status(404).json({ chyba: 'Zvíře nenalezeno' });
        res.json(radek);
    });
});

// Aktualizace zvířete
router.put('/:id', (req, res) => {
    const { jmeno, druh, vek, popis, adoptovano } = req.body;
    db.run(
        'UPDATE animals SET jmeno = ?, druh = ?, vek = ?, popis = ?, adoptovano = ? WHERE id = ?',
        [jmeno, druh, vek, popis, adoptovano ? 1 : 0, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ chyba: err.message });
            if (this.changes === 0) return res.status(404).json({ chyba: 'Zvíře nenalezeno' });
            res.json({ id: req.params.id, jmeno, druh, vek, popis, adoptovano });
        }
    );
});

// Smazání zvířete
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM animals WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ chyba: err.message });
        if (this.changes === 0) return res.status(404).json({ chyba: 'Zvíře nenalezeno' });
        res.status(204).end();
    });
});

module.exports = router;