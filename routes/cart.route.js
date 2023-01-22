const express = require("express");
const { authenticator } = require("../middlewares/authenticator.middleware");
const { CartModel } = require("../models/cart.model");
const CartRouter = express.Router();

CartRouter.get("/", async (req, res) => {
  let query = req.query;
  try {
    const Items = await CartModel.find(query);
    res.json({ Items });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
CartRouter.post("/post", async (req, res) => {
  let data = req.body;
  let UserID = req.body.UserID;
  let ProductID = req.body.ProductID;
  try {
    const exists = await CartModel.find({ UserID, ProductID });
    if (exists.length > 0) {
      res.json({
        Message: "Item already exist in cart",
        exist: true,
        Product: exists,
      });
    } else {
      const instance = new CartModel(data);
      await instance.save();
      res.json({ Message: "Added Item Successfully", Instance: instance });
    }
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
CartRouter.delete("/delete/:id", authenticator, async (req, res) => {
  let id = req.params.id;
  try {
    const deleted = await CartModel.findByIdAndDelete({ _id: id });
    res.json({ Message: "Deleted Item Successfully", Deleted: deleted });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
CartRouter.delete("/deleteAll/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let cleared = await CartModel.deleteMany({ UserID: id });
    res.json({
      Message: "Cleared All Item Successfully",
      done: true,
      Cleared: cleared,
    });
  } catch (err) {
    console.log(err);
    res.json({ Error: err, done: false });
  }
});
CartRouter.patch("/update/:id", authenticator, async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const updated = await CartModel.findByIdAndUpdate({ _id: id }, payload);
    res.json({ Message: "Updated Item Successfully", Updated: updated });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
module.exports = { CartRouter };
