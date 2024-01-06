const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookStore");

router.post("/add-book", bookController.addBook);

router.get("/get-books", bookController.getBooks);

router.get("/get-book/:id", bookController.getBook);

router.delete("/delete-book/:id", bookController.deleteBook);

module.exports = router;
