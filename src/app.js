import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);
//ponemos el socket "a que escuche" (configuramos el servidor para que escuche cualquier evento)
socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado con id: " + socket.id);
  socket.on("message", (data) => console.log(data));
  socket.on("enviar", (data) => console.log(data));
  socket.emit("evento_para_mi", "Bienvenido usuario!");
  socket.broadcast.emit(
    "evento_NO_para_mi",
    "Se ha conectado un nuevo cliente, saludalo!"
  );
  socketServer.emit(
    "evento_para_todos",
    "Recuerden respetar las politicas de la web"
  );
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
