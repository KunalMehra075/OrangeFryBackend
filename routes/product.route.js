const express = require("express");
const {
  AdminAuthenticator,
} = require("../middlewares/AdminAuthentication.middleware");

const { ProductModel } = require("../models/products.model");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  let query = req.query;
  try {
    const Products = await ProductModel.find(query);
    res.json({ Products });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
productRouter.get("/query", async (req, res) => {
  let query = req.query;
  let type = req.query.type;
  let search = req.query.search || "";
  let order = req.query.sort || "";
  let discount = req.query.discount || 0;
  console.log(query);
  try {
    const Products = await ProductModel.find({
      type: type,
      title: { $regex: search, $options: "i" },
      discount: { $gt: discount },
    }).sort({ price: order });
    res.json({ Products });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
productRouter.post("/create", AdminAuthenticator, async (req, res) => {
  let data = req.body;
  try {
    const instance = new ProductModel(data);
    await instance.save();
    res.json({ Message: "Added product Successfully", Instance: instance });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
productRouter.delete("/delete/:id", AdminAuthenticator, async (req, res) => {
  let id = req.params.id;
  try {
    const deleted = await ProductModel.findByIdAndDelete({ _id: id });
    res.json({
      Message: "Deleted product Successfully",
      deleted: true,
      Product: deleted,
    });
  } catch (err) {
    console.log(err);
    res.json({ Error: err, deleted: false });
  }
});
productRouter.patch("/update/:id", AdminAuthenticator, async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const updated = await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.json({
      Message: "Updated product Successfully",
      updated: true,
      Product: updated,
    });
  } catch (err) {
    console.log(err);
    res.json({ Error: err, updated: false });
  }
});
module.exports = { productRouter };
