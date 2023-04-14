import {Router} from "express";
import { authController } from "../controlllers/user.controller";

import {adminauthorize} from "../middleware/auth";

const router = Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/get-users/:id", adminauthorize, authController.getUserProfile);
export default router; 