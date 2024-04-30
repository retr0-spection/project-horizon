import defineItemModel from "../../common/models/Items.js";
import defineItemSizeModel from "../../common/models/ItemSize.js";
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

const { createItem, getItems, getItemById, getItemsByCategory, getItemsByGender, removeItem } = defineItemModel(sequelize);
const { updateQty} = defineItemSizeModel(sequelize);

export async function addItem(item){
    try{
        const newItem = await createItem(item);
        return newItem;
    }
    catch(error){
        console.error("Error adding item:", error);
        //throw error;
    }
}

export async function deleteItem(itemId) {
  try {
    const deletedRows = await removeItem(itemId);
    return deletedRows;
  } catch (error) {
    console.error("Error deleting item:", error);
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

export async function fetchItemById(itemId){
    try{
        const item = await getItemById(itemId);
        return item;
    } catch(error){
        console.error("Error retrieving item:", error);
        //throw error;
    }
}

export async function fetchItemsByCategory(categoryId) {
  try {
    const items = await getItemsByCategory(categoryId);
    return items;
  } catch (error) {
    console.error("Error retrieving item:", error);
    //throw error;
  }
}

export async function fetchItemsByGender(genderId) {
  try {
    const items = await getItemsByGender(genderId);
    return items;
  } catch (error) {
    console.error("Error retrieving item:", error);
    //throw error;
  }
}

export async function updateEntry(payload){
  try {
    const updatedItem = await updateQty(payload);
    return updatedItem;
  } catch (error) {
    console.error("Error updating item:", error);
    //throw error;
  }
}