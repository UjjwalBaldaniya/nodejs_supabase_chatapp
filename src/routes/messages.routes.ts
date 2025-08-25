import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/messages.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Apply auth middleware for all routes in this router
router.use(authMiddleware);

router
  .route('/')
  .get(getMessages)
  .post(createMessage);

export default router;
