import { Router } from "express";
import { loginHandler } from "../handlers/loginHandler";
import { registerHandler } from "../handlers/registerHandler";
import cryptoRouter from "./cryptoRouter";
const router = Router();

router.use("/crypto", cryptoRouter);

/**
 * password should be of length 8
 */
router.post('/register', registerHandler);

router.post('/login', loginHandler);

export default router;