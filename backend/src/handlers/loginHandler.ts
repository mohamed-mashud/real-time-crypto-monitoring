import { Request, Response } from "express";
import Users from "../db";

export const loginHandler : any = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const emailExists = await Users.findOne({ email: email });
        if(!emailExists)
            return res.json({ message: "Email doesnt exists" });
        if(emailExists.password != password)
            return res.json({ message: "Password is incorrect" });
        // console.log("user logged in");    
        return res.json({ message: "Login successful" });
    } catch (error) {
        console.log(`Error during login: ${error}`);
        return res.status(500).json({ message: "Internal server error during login" });
    }
}
