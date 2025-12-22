import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req: Request, res:Response)=>{
    try {
        const result = await userServices.createUser(req.body);
        res.status(200).json({
            success:true,
            message:"User create successfully",
            data:result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error:  error
        })
    }
}
const getUsers = async(req:Request, res: Response)=>{
    try {
        const result = await userServices.getUsers();
        res.status(201).json({
            success:true,
            message: 'User Retrieve Successfully',
            data: result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error:  error
        })
    }
}
const getUser = async(req:Request, res: Response)=>{
    
    try {
        const result = await userServices.getUser(req.params.email as (string | unknown));
        delete result.rows[0].password;
        res.status(201).json({
            success:true,
            message: 'User Retrieve Successfully',
            data: result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message: error.message,
            error:  error
        })
    }
}
export const userController = {
    createUser,
    getUsers,
    getUser
}