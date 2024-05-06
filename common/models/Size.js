import { DataTypes, Sequelize } from "sequelize";

export default function defineSizeModel(sequelize) {
  const Size = sequelize.define(
    "Size",
    {
      sizeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    },
  );

  //create your functions here

  return { Size };
}
