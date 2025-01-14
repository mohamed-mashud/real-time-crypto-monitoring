import { Router } from "express";
import { getCoinsListHandler } from "../handlers/getCoinsListHandler";
import { getCoinsPriceHandler } from "../handlers/getCoinsPriceHandler";
const cryptoRouter = Router();

cryptoRouter.get("/list", getCoinsListHandler);
cryptoRouter.get("/coinsPrice", getCoinsPriceHandler);


export default cryptoRouter;