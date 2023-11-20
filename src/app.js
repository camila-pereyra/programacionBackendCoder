import ProductManager from "./productManager.js";
import express from "express";

//inicializamos un nuevo productManager
const path = "./files/products.json";
const productManager = new ProductManager(path);
//inicializamos puerto
const PORT = 8080;
//inicializamos express
const app = express();
//habilita los req.query
app.use(express.urlencoded({ extended: true }));

//ENDPOINTS
app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  if (!limit || Number.isNaN(limit)) {
    return res.json(products);
  }
  const productsLimit = products.slice(0, limit);
  res.json(productsLimit);
});

app.get("/products/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  if (Number.isNaN(productId)) {
    return res.send({
      error: "El id ingresado no es valido",
    });
  }
  const product = await productManager.getProductById(productId);
  if (product === undefined) {
    return res.send({
      error: `El producto con id ${productId} no existe dentro de la lista`,
    });
  }
  res.send(product);
});

//servidor escuchando en el puerto (nodemon)
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
