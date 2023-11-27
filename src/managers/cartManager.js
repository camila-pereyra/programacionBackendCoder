import fs from "fs";
import path from "path";
import __dirname from "../utils.js";

export default class CartManager {
  constructor(pathFile) {
    this.path = path.join(__dirname, `/files/${pathFile}`);
  }
  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const cartsData = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(cartsData);
      return carts;
    } else {
      return [];
    }
  };

  createCart = async () => {
    const carts = await this.getCarts();
    const cartAdd = {
      id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
      products: [],
    };
    carts.push(cartAdd);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    return carts;
  };

  getCartById = async (idCart) => {
    const carts = await this.getCarts();
    const indexCart = carts.findIndex((cart) => cart.id === idCart);
    return indexCart;
  };

  addToCart = async (productId, cartId) => {
    const cartIndex = await this.getCartById(cartId);
    if (cartIndex === -1) {
      return { error: `El carrito con id ${cartId} no existe` };
    }
    const carts = await this.getCarts();
    const indexProductInCart = await this.isInCart(productId, carts[cartIndex]);
    if (indexProductInCart === -1) {
      carts[cartIndex].products.push({ productId, quantity: 1 });
    } else {
      carts[cartIndex].products[indexProductInCart].quantity += 1;
    }
    return await this.updateCart(cartIndex, carts[cartIndex]);
  };

  isInCart = async (productId, cart) =>
    cart.products.findIndex((product) => product.productId === productId);

  updateCart = async (indexCart, cartUpdate) => {
    const carts = await this.getCarts();
    carts[indexCart] = cartUpdate;
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    return carts;
  };
}
