import express from "express";
import {
  getAllOrders,
  getOrder,
  getUserOrders,
} from "../../../controllers/checkout/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.user;

  const orders = await getAllOrders();
  res.statusCode = 200;
  res.send(orders);
});
router.get("/user", async (req, res) => {
  const user = req.user;
  console.log(req)
  const {orders, items} = await getUserOrders(user.id);
  res.statusCode = 200;
  res.send({orders, items});
});

router.get("/:id", async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const orders = await getOrder(id);
  res.statusCode = 200;
  res.send(orders);
});



export default router;
