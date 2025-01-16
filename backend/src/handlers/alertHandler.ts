import { Request, Response } from "express"
import { alert } from "../routes/alert"

/**
 * returns alert messages if present
 * empty the array after the alerts are sent
 */
export const alertHandler : any = (req : Request, res : Response) => {
    if(alert.length > 0) {
        let message : string = "";
        alert.forEach(element => {
            message += element;
        }); 

        alert.length = 0;
        return res.status(200).json({message : message});
    } else {
        res.status(200).json({ message: "No alerts" })
    }
}