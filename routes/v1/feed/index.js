import express from "express";
import {
  addStock,
  changeStockDetails,
  getStock,
  getStockById,
  getStocksByCategory,
} from "../../../controllers/stock/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const payload = []
  const tops = await getStocksByCategory('top');
    if (tops?.length){
        payload.push({
            category:'tops',
            products:tops
        })
    }
  const pants = await getStocksByCategory('pants');
  if (pants?.length){
    payload.push({
        category:'pants',
        products:pants
    })
}
const shoes = await getStocksByCategory('shoes');
if (shoes?.length){
    payload.push({
        category:'shoes',
        products:shoes
    })
}
const jackets = await getStocksByCategory('jacket');
if (jackets?.length){
    payload.push({
        category:'jacket',
        products:jackets
    })
}




  res.statusCode = 200;
  res.send(payload);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await getStockById(id);
  res.statusCode = 200;
  res.send(item);
});

router.get("/category/:category", async (req, res) => {
    const category = req.params.category;
    const payload = []
    const items = await getStocksByCategory(category);
    if (items.length){
        payload.push({
            category:category == "top" ? "tops" : category,
            products:items
        })
    }
    res.statusCode = 200;
    res.send(payload);
  });



export default router;
