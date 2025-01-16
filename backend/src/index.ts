import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mainRouter from "./routes/mainRouter";
import Redis from "ioredis";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
export const redis = new Redis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(mainRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})