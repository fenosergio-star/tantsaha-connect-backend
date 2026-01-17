// routes/alerts.js
import express from "express";
import { db } from "../db.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ajouter une alerte (admin seulement)
router.post("/", verifyAdmin, (req, res) => {
  const { type, message, date_sent } = req.body;
  const user_id = req.user.id;

  if(!type || !message) return res.status(400).json({error:"Type et message obligatoires"});

  db.query(
    "INSERT INTO alerts (user_id, type, message, date_sent) VALUES (?, ?, ?, ?)",
    [user_id, type, message, date_sent || new Date()],
    (err) => err ? res.status(500).json({error:"Erreur ajout alerte"}) : res.json({message:"Alerte ajoutée"})
  );
});

// Modifier une alerte
router.put("/:id", verifyToken, (req, res) => {
  const { type, message } = req.body;
  const { id } = req.params;
  
  if(!type || !message) return res.status(400).json({error:"Type et message obligatoires"});

  db.query(
    "UPDATE alerts SET type = ?, message = ? WHERE id = ?",
    [type, message, id],
    (err) => err ? res.status(500).json({error:"Erreur modification alerte"}) : res.json({message:"Alerte modifiée"})
  );
});

// Supprimer une alerte
router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM alerts WHERE id = ?", [id], 
    (err) => err ? res.status(500).json({error:"Erreur suppression"}) : res.json({message:"Alerte supprimée"})
  );
});

// Récupérer toutes les alertes (avec pagination)
router.get("/", verifyToken, (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;
  
  db.query("SELECT * FROM alerts ORDER BY date_sent DESC LIMIT ? OFFSET ?", [limit, offset], (err, results) => {
    if(err) return res.status(500).json({error:"Erreur serveur"});
    res.json(results);
  });
});

export default router;
