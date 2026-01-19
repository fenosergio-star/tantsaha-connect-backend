import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

// 🔥 DEBUG CORS TOTAL
app.use((req, res, next) => {
  console.log("REQ ORIGIN:", req.headers.origin);

  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "DEBUG CORS OK" });
});

app.listen(PORT, () => {
  console.log("🚀 Backend DEBUG lancé sur le port", PORT);
});
