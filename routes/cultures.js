// routes/cultures.js
import express from "express";
import { db } from "../db.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Récupérer toutes les cultures
router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM cultures ORDER BY nom_culture", (err, results) => {
    if(err) return res.status(500).json({error:"Erreur serveur"});
    res.json(results);
  });
});

// Ajouter une culture (admin)
router.post("/", verifyAdmin, (req, res) => {
  const { nom_culture, saison_plantation, duree_croissance, conseils_specifiques } = req.body;
  if(!nom_culture) return res.status(400).json({error:"Nom culture obligatoire"});

  db.query(
    "INSERT INTO cultures (nom_culture, saison_plantation, duree_croissance, conseils_specifiques) VALUES (?, ?, ?, ?)",
    [nom_culture, saison_plantation, duree_croissance || 90, conseils_specifiques || ''],
    (err) => err ? res.status(500).json({error:"Erreur ajout culture"}) : res.json({message:"Culture ajoutée"})
  );
});

export default router;