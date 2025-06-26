// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const clientesRoutes = require('./routes/clientes');
const pagosRoutes = require('./routes/pagos');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pagos', pagosRoutes);

// Crear tablas si no existen
async function crearTablas() {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS empleados (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(50) UNIQUE,
      password VARCHAR(100)
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS productos (
      id VARCHAR(50) PRIMARY KEY,
      nombre VARCHAR(100),
      precio DECIMAL(10, 2),
      popularidad INT
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS clientes_recientes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      numero_cliente VARCHAR(50),
      producto VARCHAR(100),
      id_producto VARCHAR(50),
      monto DECIMAL(10, 2)
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS pagos_recientes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      producto VARCHAR(100),
      id_producto VARCHAR(50),
      monto DECIMAL(10, 2),
      imagen_url TEXT
    )`);

    // Verifica si ya existe el usuario admin
    const [rows] = await db.query(`SELECT * FROM empleados WHERE usuario = 'admin'`);
    if (rows.length === 0) {
      await db.query(`INSERT INTO empleados (usuario, password) VALUES ('admin', '1234')`);
      console.log('✅ Usuario admin creado');
    }

    console.log('✅ Tablas listas');
  } catch (err) {
    console.error('❌ Error creando tablas:', err);
  }
}

crearTablas();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
