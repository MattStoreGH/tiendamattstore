// backend/routes/productos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Agregar nuevo producto
router.post('/', async (req, res) => {
  const { id, nombre, precio, popularidad } = req.body;
  try {
    await db.query(
      'INSERT INTO productos (id, nombre, precio, popularidad) VALUES ($1, $2, $3, $4)',
      [id, nombre, precio, popularidad]
    );
    res.status(201).json({ mensaje: 'Producto agregado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

module.exports = router;
