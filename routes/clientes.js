// backend/routes/clientes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los clientes recientes
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clientes_recientes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Agregar nuevo cliente reciente
router.post('/', async (req, res) => {
  const { numero_cliente, producto, id_producto, monto } = req.body;
  try {
    await db.query(
      'INSERT INTO clientes_recientes (numero_cliente, producto, id_producto, monto) VALUES ($1, $2, $3, $4)',
      [numero_cliente, producto, id_producto, monto]
    );
    res.status(201).json({ mensaje: 'Cliente reciente agregado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar cliente reciente' });
  }
});

module.exports = router;
