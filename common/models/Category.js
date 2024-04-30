import { DataTypes, Sequelize } from "sequelize";
import defineGenderModel from "./Gender.js";
import dotenv from "dotenv";

dotenv.config();

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: 5432,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});*/

const sequelize = new Sequelize("espaza", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const { Gender } = defineGenderModel(sequelize);

export default function defineCategoryModel(sequelize) {
  const Category = sequelize.define(
    "Category",
    {
      categoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    },
  );

  Category.belongsTo(Gender, { foreignKey: "genderID", allowNull: false });

  //create your functions here

  return { Category };
}
