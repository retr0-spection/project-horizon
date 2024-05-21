import { Op } from "sequelize";
import { db } from "../../index.js";
import { getStockById } from "../stock/index.js";
import { getUserById } from "../user/index.js";

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
  // return (id, products, customer)
  if (order){
    const customer = await getUserById(order.customerID)
    const products = JSON.parse(order.items)
    // console.log(_products)
    // const products = await Promise.all(_products.map(async (productId) => await getStockById(productId.item)))

    const payload = {
      id:order.id,
      products,
      customer
    }

    return payload
  }
  return order?.dataValues;
};

export const getUserOrders = async (userId) => {
  try {
    let orders = await db.Order.findAll({ where: { customerID: userId } });
    orders = await Promise.all(orders.map(async (item) => await getOrder(item.id)));
    return orders
  } catch (err) {
    console.error(err);
  }
};

export const getAllOrders = async () => {
  try {
    let orders = await db.Order.findAll();
    orders = await Promise.all(orders.map(async (item) => await getOrder(item.id)));
    return orders;
  } catch (err) {
    console.error(err);
  }
};
