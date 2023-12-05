import { Router } from "express";
import ProductManager from "../managers/productManager.js";
const router = Router();
const productManager = new ProductManager("products.json");
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  if (products.length === 0) {
    res.render("home", { products, existProducts: false });
  } else {
    res.render("home", { products, existProducts: true });
  }
});
router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});
export default router;
