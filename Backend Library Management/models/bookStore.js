const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Book = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: Sequelize.STRING,

  currentFine: Sequelize.INTEGER,

  bookValue: Sequelize.INTEGER,
});

module.exports = Book;
