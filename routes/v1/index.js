import express from "express";
import stockRouter from "./stock/index.js";
import searchRouter from "./search/index.js";
import checkoutRouter from "./checkout/index.js";
const router = express.Router();

router.use("/stock", stockRouter);
router.use("/search", searchRouter);
router.use("/checkout", stockRouter);
