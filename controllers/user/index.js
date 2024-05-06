import { db } from "../../index.js";

export const getAllUsers = async () => {
  let users = await db.User.findAll();
  users = users.map((user) => user?.dataValues);
  return users;
};

export const getUserById = async (id) => {
  let user = await db.User.findOne({ where: { id } });
  user = user?.dataValues;
  return user;
};

export const modifyUser = async (id, payload) => {
  let user = await db.User.findOne({ where: { id } });
  if (user) {
    user.role = payload.role;
    user = await user.save();
    return user?.dataValues;
  }
};

export const deleteUserById = async (id) => {
  let user = await db.User.destroy({ where: { id } });
  console.log(user);
  return user;
};
