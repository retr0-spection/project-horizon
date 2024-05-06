import { Op } from "sequelize";
import { db } from "../../index.js";

export const createOrder = async (user, products) => {
  const payload = {
    items: JSON.stringify(products),
    customerID: user.id,
  };
  try {
    const order = await db.Order.create(payload);
    await _updateStock(products);
    return order;
  } catch (err) {
    console.log(err);
  }
};

const _updateStock = async (products) => {
  const res = await Promise.all(
    products.map((product) => {
      // update stock
    }),
  );

  return res;
};

export const getOrder = async (orderId) => {
  const order = await db.Order.findOne({ where: { id: orderId } });
  return order?.dataValues;
};

export const getUserOrders = async (userId) => {
  try {
    let orders = await db.Order.findAll({ where: { customerID: userId } });
    orders = orders.map((item) => item?.dataValues);
    const itemIds = orders.map((order) => JSON.parse(order?.items))
    let items = await db.Item.findAll({where:{
      itemId: {
      [Op.in]: itemIds
    }}})

    items = items.map((item) => item?.dataValues)
    console.log(items)
    return {orders, items};
  } catch (err) {
    console.error(err);
  }
};

export const getAllOrders = async () => {
  try {
    let orders = await db.Order.findAll();
    orders = orders.map((item) => item?.dataValues);
    return orders;
  } catch (err) {
    console.error(err);
  }
};
