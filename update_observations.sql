-- Modifier la table observations
ALTER TABLE observations DROP COLUMN planting_date;
ALTER TABLE observations ADD COLUMN lieu VARCHAR(255);