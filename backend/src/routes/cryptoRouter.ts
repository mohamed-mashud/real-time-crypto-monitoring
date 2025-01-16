import { Router } from "express";
import { checkPriceLimitHandler } from "../handlers/checkPriceLimitHandler";
import { getCoinsListHandler } from "../handlers/getCoinsListHandler";
import { getCoinsPriceHandler } from "../handlers/getCoinsPriceHandler";
import { setPriceLimitHandler } from "../handlers/setPriceLimitHandler";
const cryptoRouter = Router();

cryptoRouter.get("/list", getCoinsListHandler);
cryptoRouter.get("/coinsPrice", getCoinsPriceHandler);
cryptoRouter.post("/setlimit", setPriceLimitHandler);
cryptoRouter.post("/checklimit", checkPriceLimitHandler);
export default cryptoRouter;