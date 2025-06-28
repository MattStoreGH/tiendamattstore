const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM pagos_recientes');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { monto, producto, id, imagen } = req.body;
  try {
    await db.query(
      'INSERT INTO pagos_recientes (producto, id_producto, monto, imagen_url) VALUES (?, ?, ?, ?)',
      [producto, id, monto, imagen]
    );
    res.json({ success: true, message: 'Pago agregado' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al agregar pago' });
  }
});

module.exports = router;
