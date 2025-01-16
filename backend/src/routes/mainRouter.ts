import { Router } from "express";
import { alertRouter } from "./alert";
import { loginHandler } from "../handlers/loginHandler";
import { registerHandler } from "../handlers/registerHandler";
import cryptoRouter from "./cryptoRouter";
const router = Router();

/**
 * all that regarding of crypto coins 
 * uses this router
 */
router.use("/crypto", cryptoRouter);


/**
 * alert router for handling real time changes
 */
router.use("/alert", alertRouter)


/**
 * password should be of length 8
 * eg : {
 *      "email" : barryallen@gmail.com,
 *      "username" : Barry Allen,
 *      "password" : The flash
 * }
 */
router.post('/register', registerHandler);


/**
 * eg : {
 *      "email" : barryallen@gmail.com,
 *      "password" : The flash
 * }
 */
router.post('/login', loginHandler);

export default router;