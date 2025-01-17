import { redis } from "../index"
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

type request_body = {
    coinId: string,
    current_price: string,
    last_updated_at_from_api: number 
}

export const checkPriceLimitHandler = async (request_body: request_body): Promise<string> => {
    const { coinId, current_price, last_updated_at_from_api } = request_body;
    if (!coinId) 
        return "coinId is required"; 
    
    const key = `${coinId}_limit`
    try {
        const limitData = await redis.get(key)
        if (!limitData) 
            return "Price limit not set for this coin";
        
        const parsedData = JSON.parse(limitData)
        const { upperLimit, lowerLimit, last_updated_at } = parsedData
        
        console.log(upperLimit, lowerLimit, last_updated_at, last_updated_at_from_api)

        if (last_updated_at_from_api === last_updated_at) 
            return "Price is not Updated"

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

        return message;
    } catch (error) {
        console.error(`Error in checking price limit for ${coinId}`);
        return "Internal Server Error in checking price limit";
    }
}