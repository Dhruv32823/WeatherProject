import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();
const app = express();
app.use(cors());

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });
  const apikey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod != 200) return res.status(data.cod).json(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});


app.listen(5005, () => console.log("Backend running of http://localhost:5005"));
