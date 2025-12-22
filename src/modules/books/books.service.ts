import { pool } from "../../config/db"

const createBook = async(payload: Record<string, unknown>)=>{

    const {bookName, author, image, review, totalPages, category, publisher, yearOfPublishing} = payload;
    try {
        return await pool.query(`
            INSERT INTO books(bookName, author, image, review, totalPages, category, publisher, yearOfPublishing) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
            `,[bookName, author, image, review, totalPages, category, publisher, yearOfPublishing])
    } catch (error:any) {
        throw new Error('Book create suspended!!')
        
    }
}
const getBooks = async()=>{
    try {
        return await pool.query(`
            SELECT * FROM books
            `)
    } catch (error:any) {
        throw new Error('Books Retrieved failed!!')
    }
}
const getBook = async(id:string)=>{
    try {
        return await pool.query(`
            SELECT * FROM books WHERE book_id = $1
            `, [id])
    } catch (error:any) {
        throw new Error('Books Retrieved failed!!')
    }
}
export const bookServices = {
    createBook,
    getBooks,
    getBook
}