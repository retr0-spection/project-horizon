import { DataTypes, Sequelize } from "sequelize";
import defineItemModel from "./Items.js";
import defineSizeModel from "./Size.js";
import dotenv from "dotenv";
import { db } from "../../index.js";

dotenv.config();

export default function defineItemSizeModel(sequelize) {
  const { Item } = defineItemModel(sequelize);
  const { Size } = defineSizeModel(sequelize);

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
    },
  );

  //create your functions here

  return { ItemSize };
}
