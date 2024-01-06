const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();
app.use(cors());

const bookRoutes = require("./routes/bookStore");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/book", bookRoutes);

sequelize
  .sync()
  .then((book) => {
    // console.log(book);
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
