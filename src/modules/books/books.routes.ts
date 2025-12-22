import { Router } from "express";
import { bookController } from "./books.controller";

const router = Router();

router.post('/', bookController.createBook)
router.get('/', bookController.getBooks)
router.get('/:book_id', bookController.getBook)

export const bookRouters = router;