import { Op } from "sequelize";
import { db } from "../..";

export const searchItems = async (query) => {
  const items = await db.Item.findAll({
    where: { name: { [Op.like]: `%${query}%` } },
  });

  return items;
};
