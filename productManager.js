class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(
    tittle = "",
    description = "",
    price = 0,
    thumbnail = "",
    code = 0,
    stock = 0
  ) {
    const existsProduct = this.getProductByCode(code);
    if (existsProduct !== undefined) {
      console.log("Error: The product already exists in the list");
      return false;
    }
    if (
      tittle === "" ||
      description === "" ||
      price === 0 ||
      thumbnail === "" ||
      code === 0 ||
      stock === 0
    ) {
      console.log("Error: You must complete all product fields");
      return false;
    }
    console.log(`Add product code ${code}...`);

    const productAdd = {
      tittle: tittle,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id:
        this.getProducts().length === 0
          ? 1
          : this.getProducts()[this.getProducts().length - 1].id + 1,
    };
    this.products.push(productAdd);
    console.log(`Product code ${code} added!`);
  }

  getProductById(idProduct) {
    const found = this.getProducts().find(
      (product) => product.id === idProduct
    );
    if (found != undefined) {
      return found;
    } else {
      console.log(`Product id ${idProduct} not found`);
      return found; // undefined
    }
  }
  getProductByCode(codeProduct) {
    const found = this.getProducts().find(
      (product) => product.code === codeProduct
    );
    if (found != undefined) {
      return found;
    } else {
      console.log(`Product code ${codeProduct} not found`);
      return found; // undefined
    }
  }
}

const productManager = new ProductManager();
productManager.addProduct(
  "Remera",
  "Deportiva",
  8000,
  "remera_deportiva.png",
  150000,
  20
);
//ERROR: quiero agregar el mismo producto
productManager.addProduct(
  "Remera",
  "Deportiva",
  8000,
  "remera_deportiva.png",
  150000,
  20
);
//ERROR: quiero agregar un producto que no tiene todos los campos obligatorios
productManager.addProduct(
  "Pantalon",
  "Deportivo",
  10000,
  "pantalon_deportivo.png",
  150002
);
//AGREGO UN PROD
productManager.addProduct(
  "Pantalon",
  "Deportivo",
  10000,
  "pantalon_deportivo.png",
  150002,
  30
);
//AGREGO UN PROD
productManager.addProduct(
  "Campera",
  "Rompeviento",
  50000,
  "campera_rompeviento.png",
  160000,
  10
);
productManager.addProduct(
  "Calza",
  "Termica",
  17000,
  "calza_termica.png",
  110000,
  5
);
const productos = productManager.getProducts();
console.log(productos);
