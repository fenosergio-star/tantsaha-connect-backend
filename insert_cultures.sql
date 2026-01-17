-- Ajout colonne culture_id dans observations
ALTER TABLE observations ADD COLUMN culture_id INT;
ALTER TABLE observations ADD FOREIGN KEY (culture_id) REFERENCES cultures(id);

-- Insertion des cultures malgaches
INSERT INTO cultures (nom_culture, saison_plantation, duree_croissance, conseils_specifiques) VALUES
('Vary', 'Ririnina', 120, 'Mila rano be sy tany lemaka'),
('Katsaka', 'Fahavaratra', 90, 'Tsy mila rano be, mahazaka haintany'),
('Tsaramaso', 'Fahavaratra', 60, 'Manampy amin\'ny azota ao amin\'ny tany'),
('Patate', 'Fahavaratra', 120, 'Azo ambolena amin\'ny havoana'),
('Manioka', 'Fahavaratra', 300, 'Mahazaka ny haintany sy ny ririnina'),
('Voanjobory', 'Fahavaratra', 120, 'Mila tany maina sy masoandro');