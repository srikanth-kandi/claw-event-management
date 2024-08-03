import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:location", async (req, res) => {
  const { location } = req.params;
  const weatherResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`
  );
  res.json(weatherResponse.data);
});

export default router;
