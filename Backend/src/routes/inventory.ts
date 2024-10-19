import express, { Request, Response } from "express";
import { get, post } from "../controllers/inventoryController";
import { failed } from "../utility/responseArr";

const router = express.Router();

router

    .get("/", async (req: Request, res: Response) => {
        try {

            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
            const inventoryItems = await get(limit, offset);
            return res.send(inventoryItems);

        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    })

    .post("/", async (req: Request, res: Response) => {
        try {

            const result = await post(req.body);
            return res.send(result);

        } catch (error) {
            console.error(error);
            const errorMessage = "An error occurred while creating a Inventorys";
            return res.status(500).send(failed(errorMessage));
        }
    })



export default router;
