import { Request, Response } from 'express';
import Users from '../db';

export const registerHandler : any = async (req: Request, res: Response) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if (!email || !username || !password) {
        res.status(401).send("Missing required fields email or username or password");
        return;
    }

    try {
        const emailExists = await Users.findOne({ email: email });
        const usernameExists = await Users.findOne({ username: username });
        if (emailExists) 
            return res.status(400).send("Email already exists");
        if(usernameExists)
            return res.status(400).send("Username already exists");

        await Users.create({ email, username, password });
        return res.status(201).json({
            message : "User created"
        });
    } catch (error) {
        console.error(`Error registering user ${error}`);
        res.status(500).json({
            message : "Internal server error in registering user"
        });
    }

}