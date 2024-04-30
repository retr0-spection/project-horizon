import { db } from "../..";

export const getStock = async () => {
  const items = await db.Item.findAll();
  return items;
};

export const getStockById = async (id) => {
  const item = await db.Item.findOne({ where: { itemId: id } });
  return item?.dataValues;
};

export const setStockQuantity = async (itemId, quantity) => {
  const item = await db.Item.findOne({ where: { itemId } });
};
