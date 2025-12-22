import { Router } from "express";
import { notificationController } from "./notification.controller";

const router = Router();
router.get("/:user_email", notificationController.getNotification);
router.post("/", notificationController.createNotification);
router.put("/:user_email", notificationController.updateNotification);

export const notificationRoutes = router;
