import { DataTypes, Sequelize } from 'sequelize';

// Define your Sequelize model
export default function defineUserModel(sequelize) {
  const User = sequelize.define("User", {
    // Define your model attributes
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  });

  //create your functions here
  const createUser = async (user) => {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  return { User, createUser };

}
