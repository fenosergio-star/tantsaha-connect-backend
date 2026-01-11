// routes/observations.js
import express from "express";
import { db } from "../db.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ajouter une observation
router.post("/", verifyToken, (req, res) => {
  const { date, pluie, parasites, date_plantation } = req.body;
  const user_id = req.user.id;

  if(!date) return res.status(400).json({error: "La date est obligatoire"});

  db.query(
    "INSERT INTO observations (user_id, date, rain, pests, planting_date) VALUES (?, ?, ?, ?, ?)",
    [user_id, date, pluie || 0, parasites || "", date_plantation || null],
    (err) => err ? res.status(500).json({error:"Erreur lors de l'ajout"}) : res.json({message:"Observation ajoutée"} )
  );
});

// Récupérer toutes les observations d'un utilisateur
router.get("/", verifyToken, (req, res) => {
  const user_id = req.user.id;
  db.query("SELECT * FROM observations WHERE user_id = ?", [user_id], (err, results) => {
    if(err) return res.status(500).json({error:"Erreur serveur"});
    res.json(results);
  });
});

export default router;
