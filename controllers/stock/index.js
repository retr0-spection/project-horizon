import defineItemSizeModel from "../../common/models/ItemSize.js";
import { db } from "../../index.js";

export const getStock = async () => {
  const _items = await db.Item.findAll();
  const { getQty } = defineItemSizeModel(db.sequelize);
  const items = Promise.all(
    _items.map(async (item) => {
      if (item) {
        // get quantity
        const _arr = Array(5).fill(0);
        let quantities = await Promise.all(
          _arr.map(
            async (_, i) =>
              await getQty({ sizeId: i + 1, itemId: item?.dataValues.itemId }),
          ),
        );
        quantities = quantities.filter((item) => item);
        const payload = {
          ...item?.dataValues,
        };
        let totalCount = 0;
        for (let i = 0; i < quantities.length; i++) {
          totalCount += quantities[i]?.quantity;
        }
        console.log(totalCount);
        payload.quantity = quantities;
        payload.totalCount = totalCount;

        return payload;
      }
    }),
  );

  return items;
};

export const getStockById = async (id) => {
  const item = await db.Item.findOne({ where: { itemId: id } });
  let quantities = null;
  // query quantities
  if (item) {
    // set quantity
    const { getQty } = defineItemSizeModel(db.sequelize);
    const _arr = Array(5).fill(0);
    quantities = await Promise.all(
      _arr.map(
        async (_, i) => await getQty({ sizeId: i + 1, itemId: item.itemId }),
      ),
    );
  }
  quantities = quantities.filter((item) => item);
  const payload = {
    ...item?.dataValues,
    quantity: quantities,
  };
  let totalCount = 0;
  for (let i = 0; i < quantities.length; i++) {
    totalCount += quantities[i]?.quantity;
  }
  payload.totalCount = totalCount;
  return payload;
};

export const getStocksByCategory = async (cat) => {
  const _items = await db.Item.findAll({ where: { type: cat }});
  const { getQty } = defineItemSizeModel(db.sequelize);
  if (_items){
    const items = Promise.all(
      _items.map(async (item) => {
        if (item) {
          // get quantity
          const _arr = Array(5).fill(0);
          let quantities = await Promise.all(
            _arr.map(
              async (_, i) =>
                await getQty({ sizeId: i + 1, itemId: item?.dataValues.itemId }),
            ),
          );
          quantities = quantities.filter((item) => item);
          const payload = {
            ...item?.dataValues,
          };
          let totalCount = 0;
          for (let i = 0; i < quantities.length; i++) {
            totalCount += quantities[i]?.quantity;
          }
          console.log(totalCount);
          payload.quantity = quantities;
          payload.totalCount = totalCount;
  
          return payload;
        }
      }),
    );

    return items;
  }

  return []

};



export const addStock = async (payload) => {
  try {
    let item = await db.Item.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      gender: payload.gender,
      type: payload.type
    });

    item = item?.dataValues;

    if (item) {
      // set quantity

      const { updateQty } = defineItemSizeModel(db.sequelize);

      const quantities = [
        {
          quantity: payload.quantity.xs,
          sizeId: 1,
          itemId: item.itemId,
        },
        {
          quantity: payload.quantity.s,
          sizeId: 2,
          itemId: item.itemId,
        },
        {
          quantity: payload.quantity.m,
          sizeId: 3,
          itemId: item.itemId,
        },
        {
          quantity: payload.quantity.l,
          sizeId: 4,
          itemId: item.itemId,
        },
        {
          quantity: payload.quantity.xl,
          sizeId: 5,
          itemId: item.itemId,
        },
      ];

      const res = await Promise.all(
        quantities.map(async (_item) => {
          if (_item.quantity) {
            await updateQty(_item);
          }
        }),
      );
    }

    return item;
  } catch (err) {
    console.error(err);
  }
};

export const changeStockDetails = async (itemId, payload) => {
  const item = await db.Item.findOne({ where: { itemId } });
  item.name = payload.name;
  item.description = payload.description;
  item.price = payload.price;
  item.image = payload.image;
  item.type = payload.type;
  if (item) {
    // set quantity

    const { updateQty } = defineItemSizeModel(db.sequelize);

    const quantities = [
      {
        quantity: payload.quantity.xs,
        sizeId: 1,
        itemId: item.itemId,
      },
      {
        quantity: payload.quantity.s,
        sizeId: 2,
        itemId: item.itemId,
      },
      {
        quantity: payload.quantity.m,
        sizeId: 3,
        itemId: item.itemId,
      },
      {
        quantity: payload.quantity.l,
        sizeId: 4,
        itemId: item.itemId,
      },
      {
        quantity: payload.quantity.xl,
        sizeId: 5,
        itemId: item.itemId,
      },
    ];

    const res = await Promise.all(
      quantities.map(async (_item) => {
        if (_item.quantity) {
          await updateQty(_item);
        }
      }),
    );
  }
  return await item.save();
};
