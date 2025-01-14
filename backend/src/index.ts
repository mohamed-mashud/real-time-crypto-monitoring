import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./routes/mainRouter";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(mainRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})