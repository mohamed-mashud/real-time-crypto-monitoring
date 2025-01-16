import { redis } from "../index";
import { Request, Response } from "express";

export const setPriceLimitHandler : any = async (req: Request, res: Response) => {
    
    const { coinId, upperLimit, lowerLimit, last_updated_at } = req.body;
    if (!coinId || !upperLimit || !lowerLimit || !last_updated_at) 
        return res.status(400).json({ message: "coinId, limits and price are required" });

    const key = `${coinId}_limit`;
    const value = JSON.stringify({ upperLimit, lowerLimit,last_updated_at});
    
    try {
        await redis.set(key, value);
        return res.status(200).json({ message: `Price limit set for ${coinId}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error in setting price limit" });
    }
}