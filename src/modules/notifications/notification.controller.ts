import { Request, Response } from "express";
import { notificationServices } from "./notification.service";

const createNotification = async (req: Request, res: Response) => {
    try {
        const result = await notificationServices.createNotification(req.body);
        return res.status(200).json({
            success: true,
            message: "notification create successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getNotification = async (req: Request, res: Response) => {
    try {
        const result = await notificationServices.getNotification(
            req.params.user_email as string
        );
        return res.status(200).json({
            success: true,
            message: "notification create successfully",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const updateNotification = async (req: Request, res: Response) => {
    try {
        const result = await notificationServices.updateNotification(
            req.params.user_email as string
        );
        return res.status(200).json({
            success: true,
            message: "notification update successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
export const notificationController = {
    getNotification,
    createNotification,
    updateNotification,
};
