// routes/weather.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/:ville", async (req, res) => {
  const ville = req.params.ville;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=fr`
    );

    const data = response.data;
    res.json({
      ville: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    });
  } catch (err) {
    res.status(500).json({ error: "Impossible de récupérer la météo" });
  }
});

export default router;
