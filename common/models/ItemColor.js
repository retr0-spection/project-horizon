import { DataTypes, Sequelize } from "sequelize";
import defineItemModel from "./Items.js";
import defineColorModel from "./Color.js";
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

const { Item } = defineItemModel(sequelize);
const { Color } = defineColorModel(sequelize);

export default function defineItemColorModel(sequelize) {
  const ItemColor = sequelize.define(
    "ItemColor",
    {
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: Item,
          key: "itemId",
        },
      },
      colorId: {
        type: DataTypes.INTEGER,
        references: {
          model: Color,
          key: "colorId",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "item_colors",
      timestamps: false,
      primaryKey: true,
    }
  );

  //create your functions here

  return { ItemColor };
}
