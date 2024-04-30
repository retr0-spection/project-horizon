import express from "express";
import { addItem, fetchItems, fetchItemById, fetchItemsByCategory, fetchItemsByGender, updateEntry, deleteItem } from "./controllers/ItemsController.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    const item = req.body;
    const newItem = await addItem(item);
    if (newItem) {
      res.status(200).json(newItem);
    } else {
      res.status(404).json({ message: "Item not added" });
    }
})

router.post("/remove/:id", async (req, res) => {
  const itemId = req.params.id;
  const deletedRows = await deleteItem(itemId);
  if (deletedRows) {
    res.status(200).json(deletedRows);
  } else {
    res.status(404).json({ message: "Item not deleted" });
  }
});

router.get("/", async (req, res) => {
    const items = await fetchItems();
    if (items) {
      res.status(200).json(items);
    } else {
      res.status(404).json({ message: "Items not found" });
    }
})

router.get("/itemId/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await fetchItemById(id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
});

router.get("/categoryId/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const items = await fetchItemsByCategory(id);
  if (items) {
    res.status(200).json(items);
  } else {
    res.status(404).json({ message: "Items not found" });
  }
});

router.get("/genderId/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const items = await fetchItemsByGender(id);
  if (items) {
    res.status(200).json(items);
  } else {
    res.status(404).json({ message: "Items not found" });
  }
});

router.post("/update", async (req, res) => {
  const payload = req.body;
  const updatedItem = await updateEntry(payload);
  if (updatedItem) {
    res.status(200).json(updatedItem);
  } else {
    res.status(404).json({ message: "Items not updated" });
  }
})


export default router;

