import { Router, type Request, type Response } from "express";
import historyService from "../../service/historyService";
import WeatherService from "../../service/weatherService";

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post("/", (req: Request, res: Response) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    return res
      .status(200)
      .json({ success: "Weather data retrieved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.body.city) {
    return res.status(400).json({ error: "City name is required" });
  }
  // TODO: GET weather data from city name
  const weatherData = WeatherService.getWeatherForCity(req.body.city);
  if (!weatherData) {
    return res.status(404).json({ error: "Weather data not found" });
  }

  // // TODO: save city to search history
  // const savedCity = historyService.addCity(req.body.city);
  // await historyService;

  return res
    .status(200)
    .json({ success: "Weather data retrieved successfully" });
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
