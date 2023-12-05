//Iniciamos el socket (del lado del cliente)
const socket = io();
//lo que emite desde el front
socket.emit("message", "Hola que tal servidor?");
//lo que escucha el cliente
socket.emit("evento_para_mi", (data) => {
  console.log(data);
});
socket.emit("evento_NO_para_mi", (data) => {
  console.log(data);
});
socket.emit("evento_para_todos", (data) => {
  console.log(data);
});

const inputTittle = document.getElementById("tittle").value;
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const tittleProduct = "";
inputTittle.addEventListener("input", (e) => {});

socket.emit("enviar", { tittle: inputTittle });
