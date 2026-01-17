// db-json.js - Base de données JSON
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILES = {
  users: path.join(DATA_DIR, 'users.json'),
  cultures: path.join(DATA_DIR, 'cultures.json'),
  observations: path.join(DATA_DIR, 'observations.json'),
  alerts: path.join(DATA_DIR, 'alerts.json'),
  advices: path.join(DATA_DIR, 'advices.json')
};

// Initialiser les fichiers
export const initDatabase = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    for (const [table, file] of Object.entries(FILES)) {
      try {
        await fs.access(file);
      } catch {
        await fs.writeFile(file, JSON.stringify([]));
        console.log(`Fichier ${table}.json créé`);
      }
    }
    
    // Données initiales
    await seedData();
    console.log('Base JSON initialisée');
  } catch (error) {
    console.error('Erreur init JSON:', error);
  }
};

// Lire une table
export const readTable = async (table) => {
  try {
    const data = await fs.readFile(FILES[table], 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Écrire une table
export const writeTable = async (table, data) => {
  await fs.writeFile(FILES[table], JSON.stringify(data, null, 2));
};

// Ajouter un enregistrement
export const insert = async (table, record) => {
  const data = await readTable(table);
  const id = data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1;
  const newRecord = { id, ...record, created_at: new Date().toISOString() };
  data.push(newRecord);
  await writeTable(table, data);
  return newRecord;
};

// Données initiales
const seedData = async () => {
  const cultures = await readTable('cultures');
  if (cultures.length === 0) {
    const initialCultures = [
      { nom_culture: 'Vary', saison_plantation: 'Ririnina', mois_plantation: 'Novambra, Desambra, Janoary' },
      { nom_culture: 'Katsaka', saison_plantation: 'Fahavaratra', mois_plantation: 'Oktobra, Novambra, Desambra' },
      { nom_culture: 'Tsaramaso', saison_plantation: 'Ririnina', mois_plantation: 'Aprily, Mey, Jona' }
    ];
    
    for (const culture of initialCultures) {
      await insert('cultures', culture);
    }
  }
};