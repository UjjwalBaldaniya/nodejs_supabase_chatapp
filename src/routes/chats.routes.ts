import { Router } from "express";
import { createChat, getChatsForUser } from "../controllers/chats.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Apply auth middleware for all routes in this router
router.use(authMiddleware);

router.route("/").get(getChatsForUser).post(createChat);

export default router;
