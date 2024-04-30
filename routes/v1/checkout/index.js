import express from "express";
import { createOrder } from "../../../controllers/checkout";
const router = express.Router();

router.post("/", async (req, res) => {
  const user = req.user;
  const products = req.items;
  const body = {
    user,
    products,
  };

  const order = await createOrder(body);
  res.sendStatus(200);
  res.send();
});

export default router;
