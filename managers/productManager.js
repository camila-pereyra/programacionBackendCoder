import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const productsData = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(productsData);
      return products;
    } else {
      return [];
    }
  };

  addProduct = async (
    tittle = "",
    description = "",
    price = 0,
    thumbnail = "",
    code = 0,
    stock = 0
  ) => {
    console.log("tittle:", tittle);
    // valida que todos los campos del producto esten completos
    if (
      tittle === "" ||
      description === "" ||
      price === 0 ||
      thumbnail === "" ||
      code === 0 ||
      stock === 0
    ) {
      return console.log(`Error: You must complete all product fields`);
    }
    // valida si el producto existe dentro del array
    const existsProduct = await this.getProductByCode(code);
    if (existsProduct != undefined) {
      return console.log(
        `Error: The product code.${code} already exists in the list`
      );
    }
    console.log(`Add product code.${code}...`);
    const productos = await this.getProducts();
    const productAdd = {
      tittle: tittle,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id: productos.length === 0 ? 1 : productos[productos.length - 1].id + 1,
    };
    productos.push(productAdd);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productos, null, "\t")
    );
    return productos;
  };

  getProductById = async (idProduct) => {
    const products = await this.getProducts();
    const found = products.find((product) => product.id === idProduct);
    if (found == undefined) {
      console.log(`Product id ${idProduct} not found`);
      return undefined;
    } else {
      return found;
    }
  };

  getProductByCode = async (codeProduct) => {
    const productos = await this.getProducts();
    const found = productos.find((product) => product.code === codeProduct);
    if (found === undefined) {
      console.log(`Product code ${codeProduct} not found`);
      return undefined;
    } else {
      return found;
    }
  };

  deleteProduct = async (idProduct) => {
    console.log(`Delete product id.${idProduct}...`);
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === idProduct);
    if (index !== -1) {
      products.splice(index, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } else {
      console.log(
        `The product id.${idProduct} that you want to delete does not exist`
      );
    }
    return products;
  };

  updateProduct = async (idProduct, product) => {
    console.log(`Update product id.${idProduct}...`);
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === idProduct);
    if (index !== -1) {
      const productUpdate = { ...products[index], ...product };
      products[index] = productUpdate;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } else {
      console.log(
        `The product id.${idProduct} you want to modify does not exist`
      );
    }
    return products;
  };
}
