export const defineRelationships = (db) => {
  //user-order
  db.User.hasMany(db.Order, { onDelete: "CASCADE" });
  //order-user
  db.Order.belongsTo(db.User);
};

export const initConstantsInDb = async (db) => {
  //size-constants
  try {
    await db.Size.create({ name: "xs" });
    await db.Size.create({ name: "s" });
    await db.Size.create({ name: "m" });
    await db.Size.create({ name: "l" });
    await db.Size.create({ name: "xl" });
  } catch (err) {
    console.error(err);
  }
};
