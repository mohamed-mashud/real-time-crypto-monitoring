import { Router } from "express";
import { alertHandler } from "../handlers/alertHandler";
export const alertRouter = Router(); 
export let alert : string[] = [];


alertRouter.get("/", alertHandler);