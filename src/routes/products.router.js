import { Router } from "express";
import ProductManager from "../managers/productManager.js";

//instanciamos un  productManager
const productManager = new ProductManager("products.json");

//Inicializamos el Router
const router = Router();

//Metodos
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  if (!limit || Number.isNaN(limit) || limit <= 0) {
    return res
      .status(200)
      .send({ status: "correcto", msg: "Obtener productos", products });
  }
  const productsLimit = products.slice(0, limit);
  res.status(200).send({
    status: "correcto",
    msg: `Obtener ${limit} productos`,
    productsLimit,
  });
});

router.get("/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  if (Number.isNaN(productId)) {
    return res.status(400).send({
      status: "error",
      msg: "El id ingresado no es valido",
    });
  }
  const product = await productManager.getProductById(productId);
  if (product === undefined) {
    return res.status(400).send({
      status: "error",
      msg: `El producto con id ${productId} no existe dentro de la lista`,
    });
  }
  res.status(200).send({
    status: "correcto",
    msg: `Obtener producto id ${productId}`,
    product,
  });
});

router.post("/", async (req, res) => {
  const productBody = req.body;
  const resultAddProduct = await productManager.addProduct(productBody); //addProduct devuelve un objeto error o el array de productos
  if (!Array.isArray(resultAddProduct)) {
    return res.status(400).send({
      status: "error",
      msg: `${resultAddProduct.error}`,
    });
  }
  res.status(200).send({
    status: "correcto",
    msg: `Producto agregado`,
    resultAddProduct,
  });
});

router.put("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  if (Number.isNaN(productId)) {
    return res.status(400).send({
      status: "error",
      msg: "El id ingresado no es valido",
    });
  }
  const productUpdate = req.body;
  const resultUpdate = await productManager.updateProduct(
    productId,
    productUpdate
  ); ///updateProduct devuelve un objeto error o el array de productos
  if (!Array.isArray(resultUpdate)) {
    return res.status(400).send({
      status: "error",
      msg: `${resultUpdate.error}`,
    });
  }
  res.status(200).send({
    status: "correcto",
    msg: `Producto ${productId} actualizado`,
    resultUpdate,
  });
});

router.delete("/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  if (Number.isNaN(productId)) {
    return res.status(400).send({
      status: "error",
      msg: "El id ingresado no es valido",
    });
  }
  const resultDelete = await productManager.deleteProduct(productId); //deleteProduct devuelve un objeto error o el array de productos
  if (!Array.isArray(resultDelete)) {
    return res.status(400).send({
      status: "error",
      msg: `${resultDelete.error}`,
    });
  }
  res.status(200).send({
    status: "correcto",
    msg: `Producto id ${productId} eliminado`,
    resultDelete,
  });
});

export default router;
