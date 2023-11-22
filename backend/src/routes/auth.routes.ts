import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

import fileUpload from "express-fileupload";

const router = Router();

router.get("/isAlive", AuthController.isAlive);

router.post(
  "/verify-data-user",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  AuthController.verifyDataUser
);

router.post("/register", AuthController.registerNewUser);

router.post("/send-email", AuthController.sendEmail);

router.post("/login", AuthController.login);

router.post("/update-profile/:id", AuthController.updateProfile);

// router.post("/logout", AuthController.logout);

export default router;
