import express from "express";
import { getOrder } from "../../../controllers/checkout";
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.user;

  const orders = await db.Order.findAll();
  res.sendStatus(200);
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const orders = await getOrder(id);
  res.sendStatus(200);
  res.send(orders);
});

export default router;
