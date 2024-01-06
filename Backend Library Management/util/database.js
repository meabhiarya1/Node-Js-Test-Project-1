const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "abhi9852", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
