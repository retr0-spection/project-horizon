import express from "express";
import {
  addStock,
  changeStockDetails,
  getStock,
  getStockById,
} from "../../../controllers/stock/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await getStock();
  console.log(items);
  res.statusCode = 200;
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await getStockById(id);
  res.statusCode = 200;
  res.send(item);
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const item = await changeStockDetails(id, payload);
  res.statusCode = 200;
  res.send(item);
});

router.post("/", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const item = await addStock(payload);
  res.statusCode = 200;
  res.send(item);
});

export default router;
