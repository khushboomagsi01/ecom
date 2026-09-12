import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'server', 'data', 'ecommerce.db');
const db = new Database(dbPath);

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

import { seedProducts } from './products.js';

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

const added = insertMissing(seedProducts);
const total = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
console.log(`✅ Seed complete: added ${added} new, total ${total} products in ${dbPath}`);

db.close();