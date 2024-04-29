import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const user = req.user;
  res.sendStatus(200);
  res.send();
});

export default router;
