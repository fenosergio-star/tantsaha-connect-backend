// db-sqlite.js - Remplace db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db;

export const initDatabase = async () => {
  db = await open({
    filename: path.join(process.cwd(), 'tantsaha.db'),
    driver: sqlite3.Database
  });

  // Créer les tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'member',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cultures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom_culture TEXT NOT NULL,
      saison_plantation TEXT,
      mois_plantation TEXT,
      duree_croissance INTEGER,
      conseils_specifiques TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS observations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      culture_id INTEGER,
      date TEXT NOT NULL,
      rain TEXT,
      pests TEXT,
      lieu TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (culture_id) REFERENCES cultures(id)
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'Info',
      date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
      date_sent DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS advices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT,
      audio_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Base SQLite initialisée');
  return db;
};

export const getDatabase = () => db;

export default { initDatabase, getDatabase };