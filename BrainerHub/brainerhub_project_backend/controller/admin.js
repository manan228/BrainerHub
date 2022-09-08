const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();

    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

exports.postAddProduct = (req, res) => {
  const name = req.body.productName;
  const img = req.body.productImg;
  const description = req.body.productDescription;
  const quantity = Number(req.body.productQuantity);
  const unitPrice = Number(req.body.productUnitPrice);

  Product.create({
    name: name,
    imageUrl: img,
    description: description,
    quantity: quantity,
    unitPrice: unitPrice,
  })
    .then(() => {
      res.json({ response: `data received` });
    })
    .catch((err) => console.log(err));
};

exports.postAddToCart = async (req, res) => {
  const prodId = req.params.prodId;

  try {
    const response = await Product.findAll({
      where: {
        id: prodId,
      },
    });

    const name = response[0].name;
    const img = response[0].imageUrl;
    const description = response[0].description;
    const quantity = Number(response[0].quantity);
    const unitPrice = Number(response[0].unitPrice);

    const responseCart = await Cart.findOne({ where: { name: name } });

    if (responseCart === null) {
      Cart.create({
        name,
        imageUrl: img,
        description,
        quantity,
        unitPrice,
      });
    } else {
      responseCart.quantity += quantity;

      const response = await responseCart.save();
    }

    res.json(responseCart);
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const response = await Cart.findAll();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

exports.updateCart = async (req, res) => {
  const name = req.body.productName;
  const img = req.body.productImg;
  const description = req.body.productDescription;
  const quantity = Number(req.body.productQuantity);
  const unitPrice = Number(req.body.productUnitPrice);

  try {
    const response = await Cart.findByPk(req.body.id);

    response.set({
      name: name,
      imageUrl: img,
      description: description,
      quantity: quantity,
      unitPrice: unitPrice,
    });

    const updatedData = await response.save();

    res.json(updatedData);
  } catch (err) {
    console.log(err);
  }
};
