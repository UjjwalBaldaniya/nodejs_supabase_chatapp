import { Router } from 'express';
import { getTesting } from '../controllers/testing.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware)

router.route("/").get(getTesting);

export default router;
