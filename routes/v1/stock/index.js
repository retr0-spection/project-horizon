import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
  res.send();
});

export default router;
