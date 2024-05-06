import { DataTypes, Sequelize } from "sequelize";
import defineItemModel from "./Items.js";
import defineSizeModel from "./Size.js";
import dotenv from "dotenv";
import { db } from "../../index.js";

dotenv.config();

export default function defineItemSizeModel(sequelize) {
  const ItemSize = sequelize.define(
    "ItemSize",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Items",
          key: "itemId",
        },
        onDelete: "CASCADE",
      },
      sizeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Sizes",
          key: "sizeId",
        },
        onDelete: "CASCADE",
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
      const item_size = await ItemSize.findOne({
        where: {
          itemId: payload.itemId,
          sizeId: payload.sizeId,
        },
      });
      return item_size?.dataValues;
    } catch (error) {
      console.error("Error retrieving entry:", error);
    }
  };

  const updateQty = async (payload) => {
    console.log(payload);
    let _row = null;
    try {
      _row = await ItemSize.findOne({
        where: { itemId: payload.itemId, sizeId: payload.sizeId },
      });
      if (!_row) {
        _row = await ItemSize.create({
          quantity: payload.quantity,
          itemId: payload.itemId,
          sizeId: payload.sizeId,
        });
      } else {
        _row = await ItemSize.update(
          {
            quantity: payload.quantity,
            itemId: payload.itemId,
            sizeId: payload.sizeId,
          },
          { where: { itemId: payload.itemId, sizeId: payload.sizeId } },
        );
      }

      return _row;
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return { ItemSize, updateQty, getQty };
}
