import { DataTypes, Sequelize } from "sequelize";
import { db } from "../../index.js";

// Define your Sequelize model
export default function defineUserModel(sequelize) {
  const User = sequelize.define("user", {
    // Define your model attributes
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
}

//create your functions here
export const createUser = async (User, user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
