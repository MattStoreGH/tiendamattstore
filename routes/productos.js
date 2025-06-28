const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM productos');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { id, nombre, precio, popularidad } = req.body;
  try {
    await db.query('INSERT INTO productos (id, nombre, precio, popularidad) VALUES (?, ?, ?, ?)', [
      id, nombre, precio, popularidad
    ]);
    res.json({ success: true, message: 'Producto agregado' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al agregar producto' });
  }
});

module.exports = router;
