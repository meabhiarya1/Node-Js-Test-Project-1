const Book = require("../models/bookStore");

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
  } catch (err) {
    console.error(err);
  }
};

exports.addBook = async (req, res, next) => {
  const { name, currentFine, bookValue } = req.body;

  try {
    const book = await Book.create({ name, currentFine, bookValue });
    console.log("Book added:", book);
    res.json(book);
  } catch (err) {
    console.error(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  await Book.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json("Deleted");
    })
    .catch((err) => console.log(err));
};
