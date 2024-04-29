import express from "express";
import { addItem, fetchItems, fetchItemById } from "./controllers/ItemsController.js";

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
    if (items) {
      res.status(200).json(items);
    } else {
      res.status(404).json({ message: "Items not found" });
    }
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await fetchItemById(id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
});


export default router;

