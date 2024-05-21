import { DataTypes, Sequelize } from "sequelize";
import { db } from "../../index.js";

// Define your Sequelize model
export default function defineOrderModel(sequelize) {
  const Order = sequelize.define("order", {
    // Define your model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    customerID: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return Order;
}
