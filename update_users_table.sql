-- Ajouter la colonne role à la table users
ALTER TABLE users ADD COLUMN role ENUM('admin', 'member') DEFAULT 'member';

-- Optionnel : Créer un utilisateur admin par défaut
-- INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@tantsaha.com', '$2b$10$hashedpassword', 'admin');