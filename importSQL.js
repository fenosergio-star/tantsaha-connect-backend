// importSQL.js
import { db } from './db.js';
import fs from 'fs';

const importSQL = () => {
  const sqlContent = `
    DROP TABLE IF EXISTS advices;
    CREATE TABLE IF NOT EXISTS advices (
      id int NOT NULL AUTO_INCREMENT,
      title varchar(100) DEFAULT NULL,
      description text,
      icon varchar(100) DEFAULT NULL,
      audio_url varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    );

    INSERT INTO advices (id, title, description, icon, audio_url) VALUES
    (1, 'test', 'aona tsara ity anio ity', '', '');

    DROP TABLE IF EXISTS alerts;
    CREATE TABLE IF NOT EXISTS alerts (
      id int NOT NULL AUTO_INCREMENT,
      user_id int DEFAULT NULL,
      type varchar(50) DEFAULT NULL,
      message varchar(255) DEFAULT NULL,
      date_sent date DEFAULT NULL,
      PRIMARY KEY (id)
    );

    INSERT INTO alerts (id, user_id, type, message, date_sent) VALUES
    (1, 3, 'Alertes Parasites', 'arovy ny volinao', '2026-01-17');

    DROP TABLE IF EXISTS cultures;
    CREATE TABLE IF NOT EXISTS cultures (
      id int NOT NULL AUTO_INCREMENT,
      nom_culture varchar(100) NOT NULL,
      saison_plantation varchar(50) DEFAULT NULL,
      duree_croissance int DEFAULT NULL,
      conseils_specifiques text,
      PRIMARY KEY (id)
    );

    DROP TABLE IF EXISTS observations;
    CREATE TABLE IF NOT EXISTS observations (
      id int NOT NULL AUTO_INCREMENT,
      user_id int DEFAULT NULL,
      date date DEFAULT NULL,
      rain float DEFAULT NULL,
      pests varchar(255) DEFAULT NULL,
      culture_id int DEFAULT NULL,
      lieu varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    );

    INSERT INTO observations (id, user_id, date, rain, pests, culture_id, lieu) VALUES
    (1, 3, '2026-01-17', 7, 'kankana', NULL, NULL);

    DROP TABLE IF EXISTS users;
    CREATE TABLE IF NOT EXISTS users (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(100) DEFAULT NULL,
      email varchar(100) DEFAULT NULL,
      password varchar(255) DEFAULT NULL,
      role enum('admin','member') DEFAULT 'member',
      PRIMARY KEY (id),
      UNIQUE KEY email (email)
    );

    INSERT INTO users (id, name, email, password, role) VALUES
    (1, 'Sergio', 'sergio@gmail.com', '$2b$10$XJWeFTz9GVced3Pss4NXleT0ByF8LveYG4eCqTNFA.TOpIlw8OhK.', 'member'),
    (2, 'Mr Tojo', 'tojo@gmail.com', '$2b$10$3EuYDWFtHZ27MwpuJLqK/O9EOTttCDPwbQalna.CATenwzpaFOyg6', 'admin'),
    (3, 'mota', 'mota@gmail.com', '$2b$10$YeoxemSdyyfbBk86dxiBVusNsEfQaDY/npRbKBuhbO5ONxEYVLztq', 'admin');
  `;

  const queries = sqlContent.split(';').filter(query => query.trim());
  
  let completed = 0;
  queries.forEach((query, index) => {
    if (query.trim()) {
      db.query(query, (err) => {
        if (err) {
          console.error(`Erreur requête ${index + 1}:`, err.message);
        } else {
          console.log(`Requête ${index + 1} exécutée`);
        }
        completed++;
        if (completed === queries.length) {
          console.log('Import SQL terminé !');
        }
      });
    }
  });
};

setTimeout(() => {
  console.log('Début import SQL...');
  importSQL();
}, 5000);