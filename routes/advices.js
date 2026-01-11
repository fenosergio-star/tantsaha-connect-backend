// routes/advices.js
import express from "express";
import { db } from "../db.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ajouter un conseil
router.post("/", verifyToken, (req, res) => {
  const { titre, description, icon } = req.body;
  if(!titre || !description) return res.status(400).json({error:"Titre et description obligatoires"});

  db.query(
    "INSERT INTO advices (title, description, icon) VALUES (?, ?, ?)",
    [titre, description, icon || ""],
    (err) => err ? res.status(500).json({error:"Erreur ajout conseil"}) : res.json({message:"Conseil ajouté"})
  );
});

// Récupérer tous les conseils
router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM advices", (err, results) => {
    if(err) return res.status(500).json({error:"Erreur serveur"});
    res.json(results);
  });
});

export default router;
