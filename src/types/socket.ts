import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { config } from "../config";

const users = new Map();
export const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: config.SERVER_ORIGIN,
    },
});
io.on("connection", (socket) => {
    // console.log("Connected:", socket.id);

    socket.on("register", (userEmail) => {
        users.set(userEmail, socket.id);
    });

    socket.on(
        "sendNotification",
        (receiverEmail, notification, senderName, location) => {
            // console.log(receiverEmail, notification);
            const socketId = users.get(receiverEmail);
            if (socketId) {
                io.to(socketId).emit("newNotification", {
                    notification,
                    senderName,
                    location,
                });
            }
        }
    );
    socket.on("newComment", ({ bookId }) => {
        io.emit("newComment", { bookId });
    });
    socket.on("loggedOut", (userEmail) => {
        users.delete(userEmail);
    });

    socket.on("disconnect", () => {
        for (let [key, value] of users.entries()) {
            if (value === socket.id) users.delete(key);
        }
    });
});
