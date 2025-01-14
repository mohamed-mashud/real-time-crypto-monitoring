import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export const getCoinsPriceHandler : any = async (req: Request, res: Response) => {

    try {
        const response = await axios.get(`${process.env.COIN_API_ROOT_URL}/simple/price?ids=${process.env.COIN_IDS}&vs_currencies=inr&include_last_updated_at=true`);

        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({ message: "Internal Server Error in fetching coin prices" });
    }
}