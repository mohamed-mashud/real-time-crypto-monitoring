import { Router } from "express";
import { registerHandler } from "../handlers/registerHandler";
import { loginHandler } from "../handlers/loginHandler";
import cryptoRouter from "./cryptoRouter";
const router = Router();

router.use("/crypto", cryptoRouter);

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;