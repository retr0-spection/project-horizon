import { createUser } from "../../common/models/User.js";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { db } from "../../index.js";

dotenv.config();

export async function signup(token, role = "user") {
  try {
    const _profile = jwt.decode(token);
    const user = {
      id: _profile.sub,
      fname: _profile.given_name,
      lname: _profile.family_name,
      email: _profile.email,
      role: role,
    };
    try {
      const newUser = await createUser(db.User, user);
      return newUser;
    } catch (err) {
      const user = await db.User.findOne({ where: { id: _profile.sub } });
      return user;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
