import { pool } from "../../config/db";

const createNotification = async (payload: Record<string, unknown>) => {
    const { user_email, senderName, comment, location} = payload;
    try {
        return await pool.query(
            `INSERT INTO notifications(user_email, senderName, comment, location) VALUES($1, $2, $3, $4)`,
            [user_email, senderName, comment, location]
        );
    } catch (error: any) {
        throw new Error("Notification create suspended!!");
    }
};
const getNotification = async (email: string) => {
    try {
        return await pool.query(
            `SELECT * FROM notifications WHERE user_email=$1`,
            [email]
        );
    } catch (error: any) {
        throw new Error("Notification fetch suspended!!");
    }
};
const updateNotification = async (email: string) => {
    try {
        return await pool.query(
            `UPDATE notifications SET isRead=$1 WHERE user_email=$2`,
            [true, email]
        );
    } catch (error: any) {
        throw new Error("Notification Update Suspended!!");
    }
};
export const notificationServices = {
    createNotification,
    getNotification,
    updateNotification
};
