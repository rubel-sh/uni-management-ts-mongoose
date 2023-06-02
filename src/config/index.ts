import dotenv from "dotenv";
import path from "path";

// Set .env path as we are inside src folder
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};
