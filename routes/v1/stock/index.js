import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await getStock();
  res.sendStatus(200);
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await getStock(id);
  res.sendStatus(200);
  res.send(item);
});

export default router;
