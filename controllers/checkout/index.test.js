import { createOrder, getOrder } from ".";
import { db, sequelize } from "../..";
import { signup } from "../../authentication/controllers/AuthController";

beforeAll(async () => {
  try {
    // Sync all models to ensure they're properly initialized

    // Delete all records from each table

    // await db.Order.destroy({ where: {}, truncate: true });
    // Repeat for other models if needed

    console.log("Database purged successfully.");
  } catch (error) {
    console.error("Error purging database:", error);
  }
});

test("creates a new order", async () => {
  const googleToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjM2UzZTU1ODExMWM3YzdhNzVjNWI2NTEzNGQyMmY2M2VlMDA2ZDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NTcwODMyMzkzNTAtdmJjNHRiaXJ1cDhvaTQzbnE4cG5jMm8xZ3ZhbXF1OTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NTcwODMyMzkzNTAtdmJjNHRiaXJ1cDhvaTQzbnE4cG5jMm8xZ3ZhbXF1OTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTIzMjI1NzI3ODY1Nzc4NzI1ODIiLCJlbWFpbCI6Im5haWxhbmFyYXRpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MTQzNzIwMzcsIm5hbWUiOiJSYXRpIE5haWxhbmEiLCJnaXZlbl9uYW1lIjoiUmF0aSIsImZhbWlseV9uYW1lIjoiTmFpbGFuYSIsImlhdCI6MTcxNDM3MjMzNywiZXhwIjoxNzE0Mzc1OTM3LCJqdGkiOiIwN2NlYjBhNmEyM2Y3MTFmMzk4NTMzMDcwNzJlNzcwMTdmOTM4YmZhIn0.YG_kiHyhikPaq022WZ5CFFw2ZxA18PGy-LzKPpQAIOpENHzuv6t8qelVpBjmwP-DO7FAGvPDqFcMxh6xjv4Q_0Ppv2VZvBGEQzGgfwI5ExqsC1vk8sfuX1lV2PIsoNPmVzYZuTCzrASLiCmdIGwoCMK552ssVhID23LnRpRx0haJ4B63wCsBXs2YgKX_XHAmfp10kOCQcnxz6j1IzK_Nf0WN01XVOa31RSoJyJqy6gthj-7FxMtEeDXpF3WxyJG0pk8vbMRqPyonMkMN8Ptj0pywYFa4VArRtUq0fED9AL3LeDgswUpX2-IRmq8kGSZC0Lxk3bSj3PN4d1gbm14T3w";
  const user = await signup(googleToken);
  console.log(user);
  const products = ["1"];
  const order = await createOrder(user, products);
  expect(order).toBeTruthy();
});

test("gets an order by id", async () => {
  const order = await getOrder("1");
  console.log(order);
  expect(order).toBeTruthy();
});
