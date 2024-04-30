import { getStock, getStockById } from ".";
import { db } from "../..";

beforeAll(async () => {
  try {
    await db.Item.create({
      name: "T-shirt",
      description: "Cotton shirt made 100% from recycled",
      price: "300",
      image: "#",
    });
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  try {
    await db.Item.destroy({ where: {}, truncate: true });
  } catch (err) {
    console.log(err);
  }
});

test("get all items", async () => {
  const items = await getStock();
  expect(items).toBeDefined();
});

test("get item", async () => {
  const item = await getStockById("1");
  expect(item).toBeTruthy();
});
