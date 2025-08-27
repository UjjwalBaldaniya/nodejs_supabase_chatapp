import { Router } from "express";
import { createProfile, getProfile } from "../controllers/profiles.controller";

const router = Router();

// Apply auth middleware for all routes in this router
// router.use(authMiddleware);

router.route("/").post(createProfile).get(getProfile);

export default router;
