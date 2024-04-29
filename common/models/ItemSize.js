import { DataTypes, Sequelize } from "sequelize";
import defineItemModel from "./Items.js";
import defineSizeModel from "./Size.js";
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

const {Item} = defineItemModel(sequelize);
const {Size} = defineSizeModel(sequelize);

export default function defineItemSizeModel(sequelize) {
  const ItemSize = sequelize.define(
    "ItemSize",
    {
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: Item,
          key: "itemId",
        },
      },
      sizeId: {
        type: DataTypes.INTEGER,
        references: {
          model: Size,
          key: "sizeId",
        },
      },
    },
    {
      tableName: "item_sizes",
      timestamps: false,
      primaryKey: true,
},);

  //create your functions here

  return { ItemSize };
}
