const Sequelize = require("sequelize");

const sequelize = new Sequelize("brainerhub", "root", "sql@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
