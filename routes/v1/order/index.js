import express from "express";
import {
  createOrder,
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

router.post("/", async (req, res) => {
  const user = req.user;
  const {products} = req.body
  console.log(user)
  const orders = await createOrder(user, products);
  res.statusCode = 200;
  res.send(orders);
});

router.get("/user", async (req, res) => {
  const user = req.user;
  const orders = await getUserOrders(user.id);
  res.statusCode = 200;
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  const orders = await getOrder(id);
  res.statusCode = 200;
  res.send(orders);
});



export default router;
