const express = require("express");
const bodyparser = require("body-parser");

const cors = require("cors");

const sequelize = require("./util/database");
const adminController = require("./controller/admin");

const app = express();
app.use(cors());

app.use(bodyparser.json({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/products", adminController.getProducts);
app.post("/cart/:prodId", adminController.postAddToCart);
app.post("/add-product", adminController.postAddProduct);
app.get("/cart", adminController.getCart);
app.post("/update-cart", adminController.updateCart)

sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
