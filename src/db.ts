import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL as string)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("error connecting to db", err));

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    }
});

const Users = mongoose.model("Users", user);
export default Users;