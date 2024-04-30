import { searchItems } from ".";
import { db } from "../..";

test("finds items by name", async () => {
  const query = "shirt";
  const items = await searchItems(query);
  expect(items).toBeDefined();
});
