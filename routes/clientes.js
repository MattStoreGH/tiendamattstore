const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta de clientes');
});

module.exports = router;
