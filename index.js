const express = require("express");
const { connection } = require("./configs/db");
const { productRouter } = require("./routes/product.route");
const { userRouter } = require("./routes/user.route");
const passport = require("passport")
const { ReviewRouter } = require("./routes/review.route");
const { CartRouter } = require("./routes/cart.route");
const { FavoriteRouter } = require("./routes/favorite.route");
const cookieSession = require("cookie-session")
const cors = require("cors");
const { GoogleRouter } = require("./routes/GoogleAuth.route");


const app = express();

app.use(cors({
  origin: "https://orange-fry-backend.vercel.app",
  mehtods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"],
  credentials: true
}));
app.use(express.json());

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ["key1", "key2"],
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/google", GoogleRouter)
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
