import { redis } from "../index"
import { Request, Response } from "express"
import { alert } from "../routes/alert";


/**
 * requires coinId, current_price, last_updated_at_from_api 
 * 
 * if the value is exceeded or gone under the limit
 * it will add upto to the alert array messages and 
 * removes the key from the redis client  
 * 
 * if its within no changes occurs
 */
export const checkPriceLimitHandler: any = async (req: Request, res: Response) => {
    const { coinId, current_price, last_updated_at_from_api } = req.body;
    if (!coinId) 
        return res.status(400).json({ message: "coinId is required" })
    
    const key = `${coinId}_limit`
    try {
        const limitData = await redis.get(key)
        if (!limitData) 
            return res.status(404).json({ message: "Price limit not set for this coin" })
        
        const parsedData = JSON.parse(limitData)
        const { upperLimit, lowerLimit, last_updated_at } = parsedData
        
        console.log(upperLimit, lowerLimit, last_updated_at, last_updated_at_from_api)

        if (last_updated_at_from_api === last_updated_at) 
            return res.json({ message: "Price is not Updated" })

        let message, within = false; 
        if(current_price >= upperLimit) 
            message =  `Price of ${coinId} is over the limit`
        else if(current_price <= lowerLimit) 
            message = `Price of ${coinId} is below the limit`
        else {
            within = true;
            message = `Price of ${coinId} is within`
        }
        if(!within) {
            alert.push(message);
            await redis.del(key)
            .then(() => console.log(key , "deleted"));
        }

        return res.status(200).json({ message })
    } catch (error) {
        console.error(`Error in checking price limit for ${coinId}`);
        return res.status(500).json({ message: "Internal Server Error in checking price limit" })
    }
}