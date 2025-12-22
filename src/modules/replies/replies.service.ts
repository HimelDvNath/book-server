import { pool } from "../../config/db";

const createReply = async (payLoad: Record<string, unknown>) => {
    const { book_id, user_email, parent_comment_id, comment } = payLoad;
    let parentId: any = parent_comment_id;
    if (parent_comment_id === 0) {
        parentId = null;
    }
    try {
        return await pool.query(
            `
                INSERT INTO reply(book_id, user_email, parent_comment_id, comment) VALUES($1, $2, $3, $4) 
            `,
            [book_id, user_email, parentId, comment]
        );
    } catch (error: any) {
        throw new Error("Reply create suspended!!");
    }
};
const getReplies = async (book_id: string, parentId: string | null) => {
    try {
        return await pool.query(
            `
                SELECT r.id, r.comment, r.user_email, r.parent_comment_id, u.firstname, u.lastname
                FROM reply  r
                JOIN users u ON r.user_email = u.email
                WHERE r.book_id = $1 AND (
                    ($2::int IS NULL AND parent_comment_id IS NULL)
                 OR ($2::int IS NOT NULL AND parent_comment_id = $2)
              )
            `,
            [book_id, parentId]
        );
    } catch (error: any) {
        throw new Error("Replies Suspended");
    }
};

export const repliesServices = {
    createReply,
    getReplies,
};
