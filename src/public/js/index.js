//Iniciamos el socket (del lado del cliente)
const socket = io();

const productsDiv = document.getElementById("listProducts");

socket.on("viewProducts", (listProduct) => {
  updateProductList(listProduct);
});

function updateProductList(listProduct) {
  const productsDiv = document.getElementById("listProducts");
  if (listProduct.length !== 0) {
    const productsHTML = listProduct.map((product) => {
      return `<div>
      <p>ID del producto: ${product.id}</p>
      <p>Titulo del producto: ${product.tittle}</p>
      <p>Descripcion del producto: ${product.description}</p>
      <p>Codigo del producto: ${product.code}</p>
      <p>Precio del producto: $${product.price}</p>
      <p>Stock del producto: ${product.stock}</p>
      <p>Categoria del producto: ${product.category}</p>
      <p>Estado del producto: ${product.status}</p>
      <p>Ruta de imagen: ${product.thumbnail}</p>
      </div>`;
    });
    productsDiv.innerHTML = productsHTML;
  } else {
    productsDiv.innerHTML = "No hay productos para mostrar";
  }
}

//enviar a partir del form productos al backend
let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let tittle = form.elements.tittle.value;
  let description = form.elements.description.value;
  let code = parseInt(form.elements.code.value);
  let price = parseInt(form.elements.price.value);
  let stock = parseInt(form.elements.stock.value);
  let category = form.elements.category.value;
  let thumbnail = form.elements.thumbnail.value;

  socket.emit("addProduct", {
    tittle,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
  });

  form.reset();
});

//para eliminar por ID
const buttonDelete = document.getElementById("buttonDelete");
buttonDelete.addEventListener("click", function () {
  const inputDelete_id = document.getElementById("inputDelete_id");
  const idProduct = parseInt(inputDelete_id.value);
  socket.emit("deleteProduct", idProduct);
  inputDelete_id.value = "";
});
