import { Router } from "express";
import { repliesController } from "./replies.controller";

const router = Router();

router.post('/', repliesController.createReply);
router.get('/:book_id/:parentId', repliesController.getReplies)

export const repliesRoutes = router;