// routes/alerts.js
import express from "express";
import { db } from "../db.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ajouter une alerte
router.post("/", verifyToken, (req, res) => {
  const { type, message, date_sent } = req.body;
  const user_id = req.user.id;

  if(!type || !message) return res.status(400).json({error:"Type et message obligatoires"});

  db.query(
    "INSERT INTO alerts (user_id, type, message, date_sent) VALUES (?, ?, ?, ?)",
    [user_id, type, message, date_sent || new Date()],
    (err) => err ? res.status(500).json({error:"Erreur ajout alerte"}) : res.json({message:"Alerte ajoutée"})
  );
});

// Récupérer toutes les alertes
router.get("/", verifyToken, (req, res) => {
  const user_id = req.user.id;
  db.query("SELECT * FROM alerts WHERE user_id = ?", [user_id], (err, results) => {
    if(err) return res.status(500).json({error:"Erreur serveur"});
    res.json(results);
  });
});

export default router;
