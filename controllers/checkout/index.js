import { db } from "../..";

export const createOrder = async (user, products) => {
  const payload = {
    items: products,
    userId: user.id,
  };
  const order = db.Order.create(payload);
  return order;
};

export const getOrder = async (orderId) => {};
