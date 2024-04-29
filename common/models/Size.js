import { DataTypes, Sequelize } from "sequelize";

export default function defineSizeModel(sequelize) {
  const Size = sequelize.define(
    "Size",
    {
      sizeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  //create your functions here

  return { Size };
}
