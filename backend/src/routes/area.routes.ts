import { Router } from "express";
import AreaController from "../controllers/area.controller.js";

const router = Router();

router.get("/areas", AreaController.getAllAreas);

router.post("/areas", AreaController.addArea);

router.get("/areas/:id", AreaController.getArea);

router.put("/areas/:id", AreaController.updateArea);

router.delete("/areas/:id", AreaController.deleteArea);

export default router;
