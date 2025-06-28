const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM clientes_recientes');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { numero, compra, id, monto } = req.body;
  try {
    await db.query(
      'INSERT INTO clientes_recientes (numero_cliente, producto, id_producto, monto) VALUES (?, ?, ?, ?)',
      [numero, compra, id, monto]
    );
    res.json({ success: true, message: 'Cliente agregado' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al agregar cliente' });
  }
});

module.exports = router;
