import express from "express"
import protectRoute from "../middleware/protectRoutr.js";
import { getProfile } from "../controllers/user.controller.js";
const router =express.Router();

router.get("/profile/:username",protectRoute, getProfile)



export default router;