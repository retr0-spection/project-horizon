import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import {signup} from './controllers/AuthController.js';

const router = express.Router()

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    signup(req,res);
    res.redirect("/");
  }
);

router.post("/authenticate", (req, res) => {
  const {token} = req.body

  const profile = jwt.decode(token)
  res.statusCode = 200
  res.send(profile)
})

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

export default router;