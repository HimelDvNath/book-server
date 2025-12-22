import { Request, Response } from "express";
import { repliesServices } from "./replies.service";

const createReply = async(req:Request, res:Response)=>{
    try {
        const result = await repliesServices.createReply(req.body);
        return res.status(200).json({
            success: true,
            message: 'Reply create successfully'
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
    }
}
const getReplies = async(req:Request, res:Response)=>{
    const {book_id, parentId} = req.params;
    let parent_ID:(any) = parentId;
    if(parentId as string === '0'){
        parent_ID = null;
    }
    try {
        const result = await repliesServices.getReplies(book_id as string, parent_ID as string);
        return res.status(201).json({
            success: true,
            message: "Replies Retrieved Successfully!!",
            data: result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error: error
        })
    }
}
export const repliesController ={
    createReply,
    getReplies

}