import { Router } from "express";
import TypeComplaintController from "../controllers/typeComplaint.controller.js";

const router = Router();

router.get("/types", TypeComplaintController.getAllTypesOfComplaint);

router.post("/types", TypeComplaintController.addTypeOfComplaint);

router.get("/types/:id", TypeComplaintController.getTypeOfComplaint);

router.put("/types/:id", TypeComplaintController.updateTypeOfComplaint);

router.delete("/types/:id", TypeComplaintController.deleteTypeOfComplaint);

router.get(
  "/types-complaints",
  TypeComplaintController.getAllTypesOfComplaintWithComplaints
);

export default router;
