require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");
const morgan = require("morgan");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

//Routes

const products = require("./products.json");

app.get("/", (req, res) => {
  res.status(200).json({ products });
});

app.use(morgan("dev"));

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
