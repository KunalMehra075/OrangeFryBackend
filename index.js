const express = require("express");
const { connection } = require("./configs/db");
const { productRouter } = require("./routes/product.route");
const { userRouter } = require("./routes/user.route");
const { logger } = require("./middlewares/logger.middleware");
const { ReviewRouter } = require("./routes/review.route");
const { CartRouter } = require("./routes/cart.route");
const { FavoriteRouter } = require("./routes/favorite.route");
const cors = require("cors");

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/reviews", ReviewRouter);
app.use("/carts", CartRouter);
app.use("/favorites", FavoriteRouter);

app.get("/", (req, res) => {
  try {
    res.json({ Message: "Welcome to OrangeFry" });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to DB");
  }
  console.log(`Server is Running on port ${process.env.port}`);
});
