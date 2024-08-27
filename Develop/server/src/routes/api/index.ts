import { Router } from "express";
const router = Router();

import weatherRoutes from "./weather/weatherRoutes.js";

router.use("/weather", weatherRoutes);

export default router;
