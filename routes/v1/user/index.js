import express from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  modifyUser,
} from "../../../controllers/user/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.statusCode = 200;
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  res.statusCode = 200;
  res.send(user);
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const user = await modifyUser(id, payload);

  res.statusCode = 200;
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await deleteUserById(id);

  res.statusCode = 200;
  res.send(user);
});

export default router;
