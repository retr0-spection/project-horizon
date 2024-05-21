import express from "express";
import stockRouter from "./stock/index.js";
import searchRouter from "./search/index.js";
import checkoutRouter from "./checkout/index.js";
import itemRouter from "../../items/routes.js";
import authRouter from "../../authentication/routes.js";
import userRouter from "./user/index.js";
import orderRouter from "./order/index.js";
import feedRouter from "./feed/index.js";
const router = express.Router();

router.use("/stock", stockRouter);
router.use("/search", searchRouter);
router.use("/checkout", checkoutRouter);
router.use("/auth", authRouter);
router.use("/item", itemRouter);
router.use("/user", userRouter);
router.use("/order", orderRouter);
router.use("/feed", feedRouter);

export default router;
