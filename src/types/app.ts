import express, { Request, Response } from "express";
import { bookRouters } from "../modules/books/books.routes";
import cors from 'cors';
import { userRoutes } from "../modules/users/user.routes";
import { repliesRoutes } from "../modules/replies/replies.routes";
import { notificationRoutes } from "../modules/notifications/notification.routes";

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res:Response)=>{
    res.send('server is running')
})

app.use('/books', bookRouters)
app.use('/users', userRoutes)
app.use('/replies', repliesRoutes)
app.use('/notification', notificationRoutes)
export default app;