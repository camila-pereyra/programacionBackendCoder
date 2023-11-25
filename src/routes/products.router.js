import { Router } from "express";
import ProductManager from "../managers/productManager.js";

//inicializamos un nuevo productManager
const productManager = new ProductManager("./files/products.json");
//Inicializamos el Router
const router = Router();
//metodos
router.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  if (!limit || Number.isNaN(limit)) {
    return res.status(200).json(products);
  }
  const productsLimit = products.slice(0, limit);
  res.status(200).send({ status: "correcto", productsLimit });
});

router.get("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  if (Number.isNaN(productId)) {
    return res.status(400).send({
      status: "error",
      error: "El id ingresado no es valido",
    });
  }
  const product = await productManager.getProductById(productId);
  if (product === undefined) {
    return res.status(400).send({
      status: "error",
      error: `El producto con id ${productId} no existe dentro de la lista`,
    });
  }
  res.status(200).send(product);
});
router.post("/", async (req, res) => {
  const productBody = req.body;
  //addProduct me devuelve un objeto error o el array de productos
  const resultAddProduct = await productManager.addProduct(productBody);
  if (!Array.isArray(resultAddProduct)) {
    return res.status(400).send({
      status: "error",
      msg: `${resultAddProduct.error}`,
    });
  }

  res.status(200).send({
    status: "correcto",
    products: resultAddProduct,
  });
});

export default router;
