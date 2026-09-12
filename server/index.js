import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, 'data', 'ecommerce.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS click_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    event_type TEXT NOT NULL,
    session_id TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
  CREATE INDEX IF NOT EXISTS idx_clicks_product ON click_events(product_id);
  CREATE INDEX IF NOT EXISTS idx_clicks_session ON click_events(session_id);
`);

import { seedProducts } from '../data/products.js';

const insertStmt = db.prepare('INSERT INTO products (name, description, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)');
const existsStmt = db.prepare('SELECT 1 FROM products WHERE name = ?');
const insertMissing = db.transaction((products) => {
  let added = 0;
  for (const p of products) {
    if (!existsStmt.get(p.name)) {
      insertStmt.run(p.name, p.description, p.price, p.category, p.image_url, p.stock);
      added++;
    }
  }
  return added;
});
const addedCount = insertMissing(seedProducts);
if (addedCount > 0) console.log(`Database seeded with ${addedCount} new products`);

app.get('/api/products', (req, res) => {
  const { search = '', category = '', sort = 'name', order = 'asc', page = 1, limit = 12 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let where = 'WHERE 1=1';
  const params = [];

  if (search) {
    where += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  if (category) {
    where += ' AND category = ?';
    params.push(category);
  }

  const validSort = ['name', 'price', 'created_at', 'stock'];
  const sortCol = validSort.includes(sort) ? sort : 'name';
  const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const products = db.prepare(`
    SELECT * FROM products ${where} ORDER BY ${sortCol} ${sortOrder} LIMIT ? OFFSET ?
  `).all(...params, Number(limit), offset);

  const total = db.prepare(`SELECT COUNT(*) as c FROM products ${where}`).get(...params).c;
  const categories = db.prepare('SELECT DISTINCT category FROM products ORDER BY category').all().map(r => r.category);

  res.json({ products, total, page: Number(page), limit: Number(limit), categories });
});

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

app.post('/api/track', (req, res) => {
  const { productId, eventType, sessionId } = req.body;
  if (!productId || !eventType || !sessionId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.prepare('INSERT INTO click_events (product_id, event_type, session_id) VALUES (?, ?, ?)')
    .run(productId, eventType, sessionId);
  res.json({ success: true });
});

app.get('/api/analytics/popular', (req, res) => {
  const { days = 7, limit = 10 } = req.query;
  const rows = db.prepare(`
    SELECT p.id, p.name, p.price, p.category, p.image_url, COUNT(c.id) as click_count
    FROM products p
    LEFT JOIN click_events c ON p.id = c.product_id
      AND c.timestamp >= datetime('now', ?)
    GROUP BY p.id
    ORDER BY click_count DESC
    LIMIT ?
  `).all(`-${days} days`, Number(limit));
  res.json(rows);
});

app.get('/api/analytics/summary', (req, res) => {
  const { days = 7 } = req.query;
  const totalClicks = db.prepare(`SELECT COUNT(*) as c FROM click_events WHERE timestamp >= datetime('now', ?)`).get(`-${days} days`).c;
  const uniqueSessions = db.prepare(`SELECT COUNT(DISTINCT session_id) as c FROM click_events WHERE timestamp >= datetime('now', ?)`).get(`-${days} days`).c;
  const topCategories = db.prepare(`
    SELECT p.category, COUNT(c.id) as clicks
    FROM click_events c
    JOIN products p ON c.product_id = p.id
    WHERE c.timestamp >= datetime('now', ?)
    GROUP BY p.category
    ORDER BY clicks DESC
  `).all(`-${days} days`);
  res.json({ totalClicks, uniqueSessions, topCategories });
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));