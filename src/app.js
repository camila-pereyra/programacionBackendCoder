import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import ProductManager from "./managers/productManager.js";

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
const productManager = new ProductManager("products.json");

const socketServer = new Server(httpServer);

//ponemos el socket "a que escuche" (configuramos el servidor para que escuche cualquier evento)
socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado con id: " + socket.id);
  const products = await productManager.getProducts();
  socket.emit("viewProducts", products);
  socket.on("addProduct", (data) => {
    const resultAdd = productManager.addProduct(data);
    socket.emit("viewProducts", resultAdd);
  });
  socket.on("deleteProduct", (data) => {
    const resultDelete = productManager.deleteProduct(data);
    socket.emit("viewProducts", resultDelete);
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//inicializamos el motor
app.engine("handlebars", engine());

//Configuramos todo lo referente a plantillas
//indicamos donde estan las vistas
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Seteamos de manera estatica nuestra carpeta publica
app.use(express.static(__dirname + "/public"));

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/realTimeProducts", viewsRouter);
