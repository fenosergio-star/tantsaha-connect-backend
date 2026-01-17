// routes/observations.js
import express from "express";
import { db } from "../db.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ajouter une observation
router.post("/", verifyToken, (req, res) => {
  const { date, pluie, parasites, lieu, culture_id } = req.body;
  const user_id = req.user.id;

  if(!date) return res.status(400).json({error: "La date est obligatoire"});

  db.query(
    "INSERT INTO observations (user_id, date, rain, pests, lieu, culture_id) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, date, pluie || 0, parasites || "", lieu || "", culture_id || null],
    (err) => err ? res.status(500).json({error:"Erreur lors de l'ajout"}) : res.json({message:"Observation ajoutée"} )
  );
});

// Récupérer les observations
router.get("/", verifyToken, (req, res) => {
  const user_id = req.user.id;
  const user_role = req.user.role;
  
  let query, params;
  
  if (user_role === 'admin') {
    // Admin voit toutes les observations avec noms des utilisateurs
    query = `
      SELECT o.*, u.name as user_name, c.nom_culture 
      FROM observations o 
      LEFT JOIN users u ON o.user_id = u.id 
      LEFT JOIN cultures c ON o.culture_id = c.id 
      ORDER BY o.date DESC
    `;
    params = [];
  } else {
    // Membres voient seulement leurs observations
    query = `
      SELECT o.*, c.nom_culture 
      FROM observations o 
      LEFT JOIN cultures c ON o.culture_id = c.id 
      WHERE o.user_id = ? 
      ORDER BY o.date DESC
    `;
    params = [user_id];
  }
  
  db.query(query, params, (err, results) => {
    if(err) return res.status(500).json({error:"Erreur serveur"});
    res.json(results);
  });
});

export default router;
