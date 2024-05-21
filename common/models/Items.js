import { DataTypes, Sequelize } from "sequelize";
import defineCategoryModel from "./Category.js";
import defineGenderModel from "./Gender.js";
import dotenv from "dotenv";
import { db } from "../../index.js";

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

export default function defineItemModel(sequelize) {
  const Item = sequelize.define("Items", {
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryID: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "categoryID",
      },
      onDelete: "CASCADE",
    },
    gender: {
      allowNull: false,
      defaultValue: "male",
      type: DataTypes.STRING,
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    itemSize: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: "item_sizes",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  //create your functions here
  const createItem = async (item) => {
    try {
      const newItem = await Item.create(item);
      return newItem;
    } catch (error) {
      console.error("Error adding Item:", error);
      //throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const deletedRows = await Item.destroy({ where: { itemId: itemId } });
      return deletedRows;
    } catch (error) {
      console.error("Error deleting Item:", error);
      //throw error;
    }
  };

  const getItems = async () => {
    try {
      const items = await Item.findAll({
        //include: [Category, Gender], //The include option is used to specify which related models to eagerly load along with the items. In this case, we include the Category and Gender models to get the associated category and gender for each item.
      });
      return items;
    } catch (error) {
      console.error("Error retrieving items:", error);
      //throw error;
    }
  };

  const getItemById = async (itemId) => {
    try {
      // Find the item by its itemId
      const item = await Item.findByPk(itemId, {
        include: [db.Category /*, Gender*/], // Include associated category and gender
      });
      return item;
    } catch (error) {
      console.error("Error retrieving item:", error);
      //throw error;
    }
  };

  const getItemsByCategory = async (categoryId) => {
    try {
      const items = await Item.findAll({
        where: {
          categoryId: categoryId,
        },
      });
      return items;
    } catch (error) {
      console.error("Error retrieving items:", error);
      //throw error;
    }
  };

  const getItemsByGender = async (genderId) => {
    try {
      const items = await Item.findAll({
        where: {
          genderId: genderId,
        },
      });
      return items;
    } catch (error) {
      console.error("Error retrieving items:", error);
      //throw error;
    }
  };

  return {
    Item,
    createItem,
    getItems,
    getItemById,
    getItemsByCategory,
    getItemsByGender,
    removeItem,
  };
}
