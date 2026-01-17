// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDatabase } from "../db-sqlite.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Enregistrement utilisateur
router.post("/register", async (req, res) => {
  const { name, email, password, role, adminKey } = req.body;
  if(!name || !email || !password) return res.status(400).json({error: "Tous les champs sont obligatoires"});

  // Vérifier la clé admin si le rôle est admin
  if (role === 'admin') {
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({error: "Clé administrateur invalide"});
    }
  }

  const userRole = role === 'admin' ? 'admin' : 'member';
  const hashed = await bcrypt.hash(password, 10);

  const db = getDatabase();
  
  try {
    await db.run(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, userRole]
    );
    res.json({ message: "Utilisateur enregistré avec succès !", role: userRole });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
});

// Connexion utilisateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({error: "Tous les champs sont obligatoires"});

  const db = getDatabase();
  
  try {
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(401).json({ error: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id, name: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ message: "Connexion réussie", token, user: { id: user.id, name: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Erreur de connexion" });
  }});

export default router;
