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
      thumbnail: product.thumbnail || "",
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
