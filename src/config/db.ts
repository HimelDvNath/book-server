import { Pool } from "pg";
import { config } from ".";

export const pool = new Pool({
    connectionString: config.CONNECTION_STR,
    ssl: {
        rejectUnauthorized: false,
    },
});
const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS books(
            book_id SERIAL PRIMARY KEY,
            bookName VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            review TEXT,
            totalPages INT,
            category VARCHAR(255) NOT NULL,
            publisher VARCHAR(255) NOT NULL,
            yearOfPublishing INT
        )
        `);

    await pool.query(`
                CREATE TABLE IF NOT EXISTS users(
                    user_id SERIAL,
                    firstName VARCHAR(255) NOT NULL,
                    lastName VARCHAR(255) NOT NULL,
                    email VARCHAR(255) PRIMARY KEY,
                    password VARCHAR(255) NOT NULL
                    
                )
            `);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS reply(
                id SERIAL PRIMARY KEY,
                book_id INT REFERENCES books(book_id) ON DELETE CASCADE,
                user_email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
                parent_comment_id INT REFERENCES reply(id) ON DELETE CASCADE,
                comment TEXT
            )
            `);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS notifications(
                id SERIAL PRIMARY KEY,
                user_email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
                senderName VARCHAR(255),
                comment TEXT,
                isRead BOOLEAN DEFAULT false,
                location VARCHAR(255),
                create_time TIMESTAMP DEFAULT NOW()
            )
            `);
};
export default initDB;
