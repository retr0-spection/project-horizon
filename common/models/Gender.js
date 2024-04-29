import { DataTypes, Sequelize } from "sequelize";

export default function defineGenderModel(sequelize) {
  const Gender = sequelize.define(
    "Gender",
    {
      genderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  //create your functions here

  return { Gender };
}
