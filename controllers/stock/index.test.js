import { addStock, changeStockDetails, getStock, getStockById } from ".";
import { db } from "../..";

beforeAll(async () => {
  // try {
  //   await db.Item.destroy({ where: {}, truncate: true });
  // } catch (err) {
  //   console.log(err);
  // }
});

test("add item", async () => {
  const payload = {
    name: "T-shirt",
    description: "Cotton shirt made 100% from recycled",
    price: 300,
    image: "#",
    quantity: {
      xs: 1,
      s: 1,
      m: 1,
    },
  };
  const item = await addStock(payload);
  expect(item).toBeTruthy();
});

test("get all items", async () => {
  const items = await getStock();
  expect(items).toBeDefined();
});

test("get item", async () => {
  const item = await getStockById("1");
  expect(item).toBeTruthy();
});

test("change item details", async () => {
  const payload = {
    name: "Changed Name",
    description: "Some new description",
    price: 400,
    quantity: {
      xs: 5,
      s: 3,
      m: 1,
    },
  };
  const item = await changeStockDetails("1", payload);
  expect(item).toBeTruthy();
});
