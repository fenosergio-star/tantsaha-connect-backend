-- Création table cultures
CREATE TABLE cultures (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  nom_malagasy VARCHAR(100),
  saison_plantation VARCHAR(50),
  duree_croissance INT,
  conseils_specifiques TEXT,
  couleur VARCHAR(7) DEFAULT '#4CAF50',
  emoji VARCHAR(10) DEFAULT '🌱'
);

-- Ajout colonne culture_id dans observations
ALTER TABLE observations ADD COLUMN culture_id INT;
ALTER TABLE observations ADD FOREIGN KEY (culture_id) REFERENCES cultures(id);

-- Insertion des cultures malgaches
INSERT INTO cultures (nom, nom_malagasy, saison_plantation, duree_croissance, couleur, emoji) VALUES
('Riz', 'Vary', 'Ririnina', 120, '#4CAF50', '🌾'),
('Maïs', 'Katsaka', 'Fahavaratra', 90, '#FF9800', '🌽'),
('Haricots', 'Tsaramaso', 'Fahavaratra', 60, '#8BC34A', '🫘'),
('Patate douce', 'Patate', 'Fahavaratra', 120, '#FF5722', '🍠'),
('Manioc', 'Manioka', 'Fahavaratra', 300, '#795548', '🥔'),
('Arachides', 'Voanjobory', 'Fahavaratra', 120, '#FFC107', '🥜');