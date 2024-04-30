export const defineRelationships = (db) => {
  //user-order
  db.User.hasMany(db.Order, { onDelete: "CASCADE" });
  //order-user
  db.Order.belongsTo(db.User);
};
