import { Router } from "express";
import OfficialController from "../controllers/official.controller.js";

const router = Router();

router.get("/officials", OfficialController.getAllOfficials);

router.post("/officials", OfficialController.addOfficial);

router.get("/officials/:id", OfficialController.getOfficial);

router.put("/officials/:id", OfficialController.updateOfficial);

router.delete("/officials/:id", OfficialController.deleteOfficial);

export default router;
