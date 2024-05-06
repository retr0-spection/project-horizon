import { DataTypes, Sequelize } from "sequelize";
import defineItemModel from "./Items.js";
import defineColorModel from "./Color.js";
import dotenv from "dotenv";

dotenv.config();

export default function defineItemColorModel(sequelize) {
  const ItemColor = sequelize.define(
    "ItemColor",
    {
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Items",
          key: "itemId",
        },
      },
      colorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Colors",
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
    },
  );

  //create your functions here

  return { ItemColor };
}
