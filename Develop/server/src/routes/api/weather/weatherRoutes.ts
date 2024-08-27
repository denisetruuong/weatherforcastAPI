import { Router, type Request, type Response } from "express";
import historyService from "../../../service/historyService.js";
import WeatherService from "../../../service/weatherService.js";

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data

router.post("/", async (req: Request, res: Response) => {
  if (!req.body.cityName) {
    return res.status(400).json({ error: "City name is required" });
  }
  // TODO: GET weather data from city name
  const weatherData = WeatherService.getWeatherForCity(req.body.cityName);
  console.log(weatherData);
  if (!weatherData) {
    return res.status(404).json({ error: "Weather data not found" });
  }

  // // TODO: save city to search history
  await historyService.addCity(req.body.cityName);

  return res.status(200).json(weatherData);
});

// TODO: GET search history
router.get("/history", async (_req: Request, res: Response) => {
  try {
    const cities = historyService.getCities();
    return res.json(cities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cities = historyService.removeCity(id);
    return res.json(cities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
