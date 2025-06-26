const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta de prueba para login
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM empleados WHERE usuario = ? AND password = ?',
      [usuario, password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

module.exports = router;
