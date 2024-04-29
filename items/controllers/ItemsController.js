import defineItemModel from "../../common/models/Items.js";
import { Sequelize } from "sequelize";
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

const { createItem, getItems, getItemById } = defineItemModel(sequelize);

export async function addItem(item){
    try{
        const newItem = await createItem(item);
        return newItem;
    }
    catch(error){
        console.error("Error adding item:", error);
        throw error;
    }
}

export async function fetchItems() {
  try {
    const items = await getItems();
    return items;
  } catch (error) {
    console.error("Error retrieving items:", error);
    //throw error;
  }

}

export async function fetchItemById(id){
    try{
        const item = getItemById(id);
        return item;
    } catch(error){
        console.error("Error retrieving item:", error);
        //throw error;
    }
}
