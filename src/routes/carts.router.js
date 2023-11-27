import { Router } from "express";
import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";

//instanciamos un cartManager y un productManager (para verificar cuando agregamos un prod al carrito)
const cartManager = new CartManager("carts.json");
const productManager = new ProductManager("products.json");

//Inicializamos el Router
const router = Router();

//Metodos
router.post("/", async (req, res) => {
  const carts = await cartManager.createCart();
  res.status(200).send({
    status: "correcto",
    msg: "Carrito creado",
    carts,
  });
});

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.status(200).send({
    status: "correcto",
    msg: "Obtener carritos",
    carts,
  });
});

router.get("/:cid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  if (Number.isNaN(cartId)) {
    return res.status(400).send({
      status: "error",
      msg: "El id ingresado no es valido",
    });
  }
  const carts = await cartManager.getCarts();
  const cartIndex = await cartManager.getCartById(cartId);
  if (cartIndex === -1) {
    return res.status(400).send({
      status: "error",
      msg: `El carrito con id ${cartId} no existe dentro de la lista`,
    });
  }
  res.status(200).send({
    status: "correcto",
    msg: `Obtener carrito id ${cartId}`,
    cart: carts[cartIndex],
  });
});

router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  let prodId = parseInt(req.params.pid);
  if (Number.isNaN(cartId)) {
    return res.status(400).send({
      status: "error",
      msg: "El id del carrito no es valido",
    });
  }
  if (Number.isNaN(prodId)) {
    return res.status(400).send({
      status: "error",
      msg: "El id del producto no es valido",
    });
  }
  const existProductInDB = await productManager.getProductById(prodId); //verifico que el producto exista en la base de datos products.json
  if (existProductInDB === undefined) {
    return res.status(400).send({
      status: "error",
      msg: `El producto id ${prodId} es inexistente`,
    });
  }
  const carts = await cartManager.addToCart(prodId, cartId); //addToCart devuelve un objeto error o un array de todos los carritos
  if (!Array.isArray(carts)) {
    return res.status(400).send({
      status: "error",
      msg: `${carts.error}`,
    });
  }
  res.status(200).send({
    status: "correcto",
    msg: `Agregando prod. id ${prodId} al carrito ${cartId}`,
    carts,
  });
});

export default router;
