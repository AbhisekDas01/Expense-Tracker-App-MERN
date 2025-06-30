import { config } from "dotenv";

config({path: `.env.development.local`});

export const {
    CLIENT_URL,
    PORT,
    MONGO_URI,
    JWT_SECRET
} = process.env;