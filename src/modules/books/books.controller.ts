import { Request, Response } from "express";
import { bookServices } from "./books.service";

const createBook = async (req: Request, res: Response) => {
    try {
        const result = await bookServices.createBook(req.body);
        return res.status(201).json({
            success: true,
            message: "Book create successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getBooks = async (req: Request, res: Response) => {
    try {
        const result = await bookServices.getBooks();
        return res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
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
const getBook = async (req: Request, res: Response) => {
    try {
        const result = await bookServices.getBook(req.params.book_id as string);
        return res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
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
export const bookController = {
    createBook,
    getBooks,
    getBook
};
