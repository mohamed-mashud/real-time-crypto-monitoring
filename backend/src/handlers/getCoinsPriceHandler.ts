import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { redis } from "../index";
dotenv.config();

/**
 * this endpoint caches data for every 60 seconds, thus making 
 * the response time much faster and quick data reterivals,
 * when there is no cached data, it loops through the coins 
 * array and checks for any coin_id which limit set on them
 * 
 * If there is a limit, it passes onto another endpoint for 
 * checking limit is high or low or within the limit,
 * if there is no limit, it returns the data directly
 * 
 */
export const getCoinsPriceHandler : any = async (req: Request, res: Response) => {
    const cachedCoinPrices = await redis.get("cachedCoinPrices");

    if(cachedCoinPrices) {
        console.log(`coin Prices from cached data`);
        return res.json(JSON.parse(cachedCoinPrices));
    }
    else {
        try {
            console.log("coin prices from endpoint")
            let COINS : string = process.env.COIN_IDS || "";
            const response = await axios.get(`${process.env.COIN_API_ROOT_URL}/simple/price?ids=${COINS}&vs_currencies=inr&include_last_updated_at=true`);
            const dataToBeCached = JSON.stringify(response.data);
            
            const coinArray = COINS.split(",");

            coinArray.forEach(async (coin_id) => {
                let key= `${coin_id}_limit`;
                const limitData = await redis.get(key);
                if(!limitData) {
                    console.log(`Price limit not set for ${coin_id}`);
                } else {
                    try {
                        const responseFromCheckLimit = await axios.post(
                            "http://localhost:3000/crypto/checklimit", // URL
                            {
                                coinId: coin_id,
                                current_price: response.data[coin_id].inr,
                                last_updated_at_from_api: response.data[coin_id].last_updated_at, // Body
                            }
                        );
                    
                        const message = responseFromCheckLimit.data.message;
                        console.log(`message from check price limit endpoint ${message}`)
                        const messageElements = message.split(" ");
                        const isLimit = messageElements[messageElements.length - 1] === "limit";
                    
                        if (isLimit) {
                            console.log(`Price is changed for ${coin_id} and ${message}`);
                            
                        } else {
                            console.log(`Price is not changed for ${coin_id} and ${message}`);
                        }
                    } catch (error: any) {
                        console.error("Error occurred:", error.response?.data || error.message);
                    }
                }
            })
            
            // cached for 60 seconds 
            await redis.set("cachedCoinPrices", dataToBeCached, "EX", 10); 
            return res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            
            return res.status(500).json({ 
                message: "Internal Server Error in fetching coin prices"
            });
        }
    } 
}