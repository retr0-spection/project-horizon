import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export default function defineCategoryModel(sequelize) {
  const Category = sequelize.define(
    "Category",
    {
      categoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      genderID: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Genders",
          key: "genderID",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: false,
    },
  );

  //create your functions here

  return { Category };
}
