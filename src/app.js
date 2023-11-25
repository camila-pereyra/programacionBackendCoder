import express from "express";
import productsRouter from "./routes/products.router.js";
//inicializamos puerto
const PORT = 8080;
//inicializamos express
const app = express();
//Middleware a nivel aplicacion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//servidor escuchando en el puerto
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
//endpoints
app.use("/api/products", productsRouter);
