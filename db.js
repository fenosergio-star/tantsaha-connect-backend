// db.js - Version SQLite
import { getDatabase } from './db-sqlite.js';

export const db = {
  query: async (sql, params, callback) => {
    const database = getDatabase();
    try {
      if (sql.toLowerCase().startsWith('select')) {
        const results = await database.all(sql, params);
        callback(null, results);
      } else {
        const result = await database.run(sql, params);
        callback(null, result);
      }
    } catch (err) {
      callback(err);
    }
  }
};