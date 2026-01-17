// routes/advices.js
import express from "express";
import { db } from "../db.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ajouter un conseil (utilisateurs connectés)
router.post("/", verifyToken, (req, res) => {
  const { title, description, icon, audio_url } = req.body;
  if(!title || !description) return res.status(400).json({error:"Titre et description obligatoires"});

  db.query(
    "INSERT INTO advices (title, description, icon, audio_url) VALUES (?, ?, ?, ?)",
    [title, description, icon || "", audio_url || ""],
    (err) => err ? res.status(500).json({error:"Erreur ajout conseil"}) : res.json({message:"Conseil ajouté"})
  );
});

// Modifier un conseil
router.put("/:id", verifyToken, (req, res) => {
  const { title, description, icon, audio_url } = req.body;
  const { id } = req.params;
  
  if(!title || !description) return res.status(400).json({error:"Titre et description obligatoires"});

  db.query(
    "UPDATE advices SET title = ?, description = ?, icon = ?, audio_url = ? WHERE id = ?",
    [title, description, icon || "", audio_url || "", id],
    (err) => err ? res.status(500).json({error:"Erreur modification conseil"}) : res.json({message:"Conseil modifié"})
  );
});

// Supprimer un conseil
router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM advices WHERE id = ?", [id], 
    (err) => err ? res.status(500).json({error:"Erreur suppression"}) : res.json({message:"Conseil supprimé"})
  );
});

// Récupérer tous les conseils (tous les utilisateurs connectés)
router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM advices", (err, results) => {
    if(err) return res.status(500).json({error:"Erreur serveur"});
    res.json(results);
  });
});

export default router;
