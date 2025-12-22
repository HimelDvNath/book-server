import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post('/signup', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:email', userController.getUser)

export const userRoutes = router;