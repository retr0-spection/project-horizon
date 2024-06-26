import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { signup } from "./controllers/AuthController.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    signup(req, res);
    res.redirect("/");
  },
);

router.post("/authenticate", async (req, res) => {
  const { token } = req.body;
  const profile = await signup(token);
  res.statusCode = 200;
  // console.log("token: " + token);
  res.send({ ...profile, token });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

export default router;
