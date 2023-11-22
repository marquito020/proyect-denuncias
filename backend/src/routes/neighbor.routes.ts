import { Router } from "express";
import NeighborController from "../controllers/neighbor.controller.js";

const router = Router();

router.get("/neighbors/:id", NeighborController.getNeighbor);

export default router;
