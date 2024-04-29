import express from "express";
import { addItem, fetchItems } from "./controllers/ItemsController.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    const item = req.body;
    const newItem = await addItem(item);
    if (newItem){
        res.status(200).json(newItem);
    }
})

router.get("/", async (req, res) => {
    const items = await fetchItems();
    if (items){
        res.status(200).json(items)
    }
})

export default router;

