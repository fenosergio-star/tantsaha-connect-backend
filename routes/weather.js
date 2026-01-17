// routes/weather.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Route par défaut pour Antananarivo
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Antananarivo&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=fr`
    );

    const data = response.data;
    res.json({
      ville: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s vers km/h
      visibility: Math.round(data.visibility / 1000), // m vers km
      icon: data.weather[0].icon
    });
  } catch (err) {
    console.error('Erreur météo:', err.message);
    res.status(500).json({ error: "Tsy afaka mahazo ny toetr'andro" });
  }
});

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
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      visibility: Math.round(data.visibility / 1000),
      icon: data.weather[0].icon
    });
  } catch (err) {
    console.error('Erreur météo ville:', err.message);
    res.status(500).json({ error: "Tsy afaka mahazo ny toetr'andro" });
  }
});

export default router;
