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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "item_sizes",
      timestamps: false,
      primaryKey: true,
    },
  );

  //create your functions here

  const getQty = async (payload) => {
    try {
      const item_size = await ItemSize.findAll({
        where: {
          itemId: payload.itemId,
          sizeId: payload.sizeId,
        },
      });
      return item_size;
    } catch (error) {
      console.error("Error retrieving entry:", error);
    }
  }

  const updateQty = async (payload) => {
    try {
      const updatedRow = await ItemSize.update(
        { quantity: sequelize.literal(`quantity + ${payload.quantity}`) },
        { where: { itemId: payload.itemId, sizeId: payload.sizeId } }
      );
      
      const updatedItem = await getQty(payload)
      return updatedItem;
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  }

  return { ItemSize, updateQty, getQty };
}
