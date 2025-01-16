import { Router } from "express";
import { checkPriceLimitHandler } from "../handlers/checkPriceLimitHandler";
import { getCoinsListHandler } from "../handlers/getCoinsListHandler";
import { getCoinsPriceHandler } from "../handlers/getCoinsPriceHandler";
import { setPriceLimitHandler } from "../handlers/setPriceLimitHandler";
const cryptoRouter = Router();

/**
 * returns all the available list of coins with ids and price
 */
cryptoRouter.get("/list", getCoinsListHandler);

/**
 * return prices of particular coins with ids and last_updated_at time
 */
cryptoRouter.get("/coinsPrice", getCoinsPriceHandler);

/**
 * used to setlimit for a coin with its coin_id
 * eg : {
    "coinId" : "ethereum",
    "upperLimit" : 290100,
    "lowerLimit" : 290090,
    "last_updated_at": 1737030810
 * }
 */
cryptoRouter.post("/setlimit", setPriceLimitHandler);


/**
 * The API which returns the coin data, only returns the 
 * differentiated value every 60 seconds, thus 
 * this endpoint is used to check if the price has crossed the limit
 * no need to hit this endpoint already wrote instances where
 * new data comes up this automatically checks the differences
 * 
 * eg : {
 *  "coinId" : "ethereum",
 *  "current_price" : 290995,
 *  "last_updated_at_from_api" : 1737031837
 * }
 */
cryptoRouter.post("/checklimit", checkPriceLimitHandler);

export default cryptoRouter;