import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//inicializamos el motor
app.engine("handlebars", handlebars.engine());
//indicamos donde estan las vistas
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
//seteamos de manera estatica nuestra carpeta publica
app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
