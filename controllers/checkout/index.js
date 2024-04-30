import { db } from "../..";

export const createOrder = async (user, products) => {
  const payload = {
    items: JSON.stringify(products),
    userId: user.id,
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
