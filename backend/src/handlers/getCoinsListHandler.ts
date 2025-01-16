import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();


/**
 * returns all the available coins id with prices and last updated data 
 */
export const getCoinsListHandler : any = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${process.env.COIN_API_ROOT_URL}/coins/list`);

        return res.json(response.data);
    } catch (error) {
        console.log(`Error during fetching coins list: ${error}`);
        
        return res.status(500).json({ message: "Internal server error during fetching coins list" });
    }
}