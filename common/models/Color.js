import { DataTypes, Sequelize } from "sequelize";

export default function defineColorModel(sequelize) {
  const Color = sequelize.define(
    "Color",
    {
      colorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

  return { Color };
}
