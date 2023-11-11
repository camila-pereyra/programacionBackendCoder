import ProductManager from "./managers/productManager.js";
const path = "files/products.json";

const manager = new ProductManager(path);

const env = async () => {
  try {
    const productsList = await manager.getProducts();
    //console.log(productsList);
    /* const productsAdd = await manager.addProduct(
      "Campera",
      "Rompev",
      30000,
      "campera.png",
      150003,
      8
    ); */
    //console.log(productsAdd);
    //const productID = await manager.getProductById(5); //PRODUCTO ENCONTRADO
    //console.log(productID);
    //const productCode = await manager.getProductByCode(18000000); //PRODUCTO NO ENCONTRADO
    //console.log(productCode);
    //const productsDelete = await manager.deleteProduct(2);  //ELIMINANDO PRODUCTO ID.2
    //console.log(productsDelete);
    /* const productUpdate = {
      description: "Rompeviento",
      thumbnail: "campera_rompeviento.png",
    }; */
    //const productsUpdate = await manager.updateProduct(4, productUpdate); //ELIMINANDO PRODUCTO ID.4
    //console.log(productsUpdate);
  } catch (error) {
    console.log(error);
  }
};

env();
