// backend/routes/pagos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los pagos recientes
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pagos_recientes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
});

// Agregar nuevo pago reciente
router.post('/', async (req, res) => {
  const { producto, id_producto, monto, imagen_url } = req.body;
  try {
    await db.query(
      'INSERT INTO pagos_recientes (producto, id_producto, monto, imagen_url) VALUES ($1, $2, $3, $4)',
      [producto, id_producto, monto, imagen_url]
    );
    res.status(201).json({ mensaje: 'Pago reciente agregado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar pago reciente' });
  }
});

module.exports = router;
