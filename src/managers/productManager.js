import fs from "fs";
import path from "path";
import __dirname from "../utils.js";

export default class ProductManager {
  constructor(pathFile) {
    this.path = path.join(__dirname, `/files/${pathFile}`);
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

  addProduct = async (product) => {
    // valida que todos los campos del producto esten completos
    if (
      !product.tittle ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.stock ||
      !product.category
    ) {
      return {
        error: "El producto a agregar no tiene todos los campos obligatorios",
      };
    }
    // valida si el producto existe dentro del array
    const existsProduct = await this.getProductByCode(product.code);
    if (existsProduct != undefined) {
      return {
        error: `El producto code ${product.code} que quiere agregar ya existe`,
      };
    }
    const productos = await this.getProducts();
    const productAdd = {
      id: productos.length === 0 ? 1 : productos[productos.length - 1].id + 1,
      tittle: product.tittle,
      description: product.description,
      code: product.code,
      price: product.price,
      status: true,
      stock: product.stock,
      category: product.category,
      thumbnail:
        product.thumbnail === undefined || product.thumbnail === ""
          ? []
          : [product.thumbnail],
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
    const found = products.find(
      (product) => product.id === parseInt(idProduct)
    );
    if (found == undefined) {
      return undefined;
    } else {
      return found;
    }
  };

  getProductByCode = async (codeProduct) => {
    const productos = await this.getProducts();
    const found = productos.find(
      (product) => product.code === parseInt(codeProduct)
    );
    if (found === undefined) {
      return undefined;
    } else {
      return found;
    }
  };

  deleteProduct = async (idProduct) => {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === idProduct);
    if (index === -1) {
      return {
        error: `El producto id.${idProduct} no existe`,
      };
    }
    products.splice(index, 1);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return products;
  };

  updateProduct = async (idProduct, product) => {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === idProduct);
    if (index === -1) {
      return {
        error: `El producto id.${idProduct} no existe`,
      };
    }
    const arrThumbnail = [...products[index].thumbnail];
    if (product.thumbnail !== undefined) {
      arrThumbnail.push(product.thumbnail);
    }
    const prodUpdate = {
      id: products[index].id,
      tittle: product.tittle || products[index].tittle,
      description: product.description || products[index].description,
      code: product.code || products[index].code,
      price: product.price || products[index].price,
      status: product.status || products[index].status,
      stock: product.stock || products[index].stock,
      category: product.category || products[index].category,
      thumbnail: arrThumbnail,
    };
    products[index] = prodUpdate;
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return products;
  };
}
