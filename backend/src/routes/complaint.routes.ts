import { Router } from "express";
import fileUpload from "express-fileupload";

import ComplaintController from "../controllers/complaint.controller.js";

const router = Router();

router.post(
  "/complaints",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  ComplaintController.addComplaint
);

router.get("/complaints/:id", ComplaintController.getComplaint);

router.put(
  "/complaints/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  ComplaintController.updateComplaint
);

router.delete("/complaints/:id", ComplaintController.deleteComplaint);

router.get("/complaints/person/:id", ComplaintController.getAllComplaintPerson);

router.get(
  "/complaints/official/:id",
  ComplaintController.getAllComplaintsOfficial
);

router.post(
  "/complaints/observation",
  ComplaintController.addObservationWithState
);

export default router;
