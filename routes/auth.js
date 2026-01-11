// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Enregistrement utilisateur
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return res.status(400).json({error: "Tous les champs sont obligatoires"});

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
    (err) => {
      if (err) return res.status(500).json({ error: "Erreur lors de l'enregistrement" });
      res.json({ message: "Utilisateur enregistré avec succès !" });
    }
  );
});

// Connexion utilisateur
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({error: "Tous les champs sont obligatoires"});

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: "Utilisateur non trouvé" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ message: "Connexion réussie", token });
  });
});

export default router;
