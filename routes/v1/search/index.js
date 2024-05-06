import express from "express";
const router = express.Router();

router.get("/:query", async (req, res) => {
  const query = req.params.query;
  const items = await searchItems(query);
  res.statusCode = 200;
  res.send(items);
});

export default router;
