// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const DB_FILE = './data/db.sqlite';
const SECRET = process.env.JWT_SECRET || 'replace_with_secure_key';
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// open database
const db = new sqlite3.Database(DB_FILE);

// initialize tables if not present
const initSql = `
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS drugs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  batch TEXT,
  quantity INTEGER DEFAULT 0,
  unit TEXT,
  price REAL DEFAULT 0,
  expiry_date DATE,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS stock_movements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  drug_id INTEGER,
  change INTEGER,
  type TEXT,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (drug_id) REFERENCES drugs(id) ON DELETE CASCADE
);
`;
db.exec(initSql, (err) => {
  if (err) console.error('DB init error:', err);
  else console.log('DB initialized or already present');
});

// ... (rest of server.js content skipped for brevity in this zip creation)
