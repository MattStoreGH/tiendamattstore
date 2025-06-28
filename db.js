// backend/db.js
const { Pool } = require('pg');

const db = new Pool({
  user: 'tiendamattstore_db_user',
  host: 'dpg-d1fmbcnfte5s73fmhosg-a',
  database: 'tiendamattstore_db',
  password: 'p9qiXNajQcMXBUMnqvr78fY1mcyl0EQO',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;
