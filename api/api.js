const express = require('express');
const db = require('../database/db');
const router = express.Router();

// ----------- PETS --------------

// List all pets
router.get('/pets', (req, res) => {
    db.all('SELECT * FROM pets', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get one pet
router.get('/pets/:id', (req, res) => {
    db.get('SELECT * FROM pets WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Create pet
router.post('/pets', (req, res) => {
    const { name, species, age, description, adopted, owner_id } = req.body;
    db.run(
        'INSERT INTO pets (name, species, age, description, adopted, owner_id) VALUES (?, ?, ?, ?, ?, ?)',
        [
            name,
            species,
            age ? Number(age) : null,
            description || null,
            adopted ? 1 : 0,
            owner_id ? Number(owner_id) : null
        ],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Update pet
router.put('/pets/:id', (req, res) => {
    const { name, species, age, owner_id } = req.body;
    db.run(
        'UPDATE pets SET name = ?, species = ?, age = ?, owner_id = ? WHERE id = ?',
        [name, species, age ? Number(age) : null, owner_id ? Number(owner_id) : null, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changed: this.changes });
        }
    );
});

// Delete pet
router.delete('/pets/:id', (req, res) => {
    db.run('DELETE FROM pets WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// ----------- OWNERS --------------

// List all owners
router.get('/owners', (req, res) => {
    db.all('SELECT * FROM owners', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get one owner
router.get('/owners/:id', (req, res) => {
    db.get('SELECT * FROM owners WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Create owner
router.post('/owners', (req, res) => {
    const { firstname, lastname, phone } = req.body;
    db.run(
        'INSERT INTO owners (firstname, lastname, phone) VALUES (?, ?, ?)',
        [firstname, lastname, phone],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Update owner
router.put('/owners/:id', (req, res) => {
    const { firstname, lastname, phone } = req.body;
    db.run(
        'UPDATE owners SET firstname = ?, lastname = ?, phone = ? WHERE id = ?',
        [firstname, lastname, phone, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changed: this.changes });
        }
    );
});

// Delete owner
router.delete('/owners/:id', (req, res) => {
    db.run('DELETE FROM owners WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// ----------- VACCINATIONS --------------

// List all vaccinations
router.get('/vaccinations', (req, res) => {
    db.all('SELECT * FROM vaccinations', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get one vaccination
router.get('/vaccinations/:id', (req, res) => {
    db.get('SELECT * FROM vaccinations WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Create vaccination
router.post('/vaccinations', (req, res) => {
    const { pet_id, name, date } = req.body;
    db.run(
        'INSERT INTO vaccinations (pet_id, name, date) VALUES (?, ?, ?)',
        [pet_id, name, date],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Update vaccination
router.put('/vaccinations/:id', (req, res) => {
    const { pet_id, name, date } = req.body;
    db.run(
        'UPDATE vaccinations SET pet_id = ?, name = ?, date = ? WHERE id = ?',
        [pet_id, name, date, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ changed: this.changes });
        }
    );
});

// Delete vaccination
router.delete('/vaccinations/:id', (req, res) => {
    db.run('DELETE FROM vaccinations WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// Zvířata konkrétního majitele
router.get('/owners/:id/pets', (req, res) => {
    db.all('SELECT * FROM pets WHERE owner_id = ?', [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

async function deleteAnimal(id) {
    const response = await fetch('/api/pets/' + id, { method: 'DELETE' });
    if (response.ok) {
        fetchAnimals(); // znovu načti seznam zvířat
    } else {
        alert('Chyba při mazání zvířete');
    }
}



module.exports = router;



