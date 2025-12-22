import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payLoad: Record<string, unknown>) => {
    const { firstName, lastName, email, password } = payLoad;
    try {
        const hashpass = await bcrypt.hash(password as string, 10);
        return await pool.query(
            `
                INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *
            `,
            [firstName, lastName, email, hashpass]
        );
    } catch (error: any) {
        throw new Error("User create Suspended!!");
    }
};
const getUsers = async () => {
    try {
        return await pool.query(`SELECT * FROM users`);
    } catch (error: any) {
        throw new Error("Users Retrieve Suspended!!");
    }
};
const getUser = async(email:(string | unknown))=>{
   
    try {
        return await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    } catch (error: any) {
        throw new Error("User Retrieve Suspended!!");
    }
}

export const userServices = {
    createUser,
    getUsers,
    getUser
};
