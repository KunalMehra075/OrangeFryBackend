const express = require("express");
const { FavoritesModel } = require("../models/favorite.model");
const { authenticator } = require("../middlewares/authenticator.middleware");

const FavoriteRouter = express.Router();

FavoriteRouter.get("/", async (req, res) => {
  let query = req.query;
  console.log(query);
  try {
    const Items = await FavoritesModel.find(query);
    res.json({ Items });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
FavoriteRouter.post("/post", authenticator, async (req, res) => {
  let data = req.body;
  let UserID = req.body.UserID;
  let ProductID = req.body.ProductID;
  try {
    const exists = await FavoritesModel.find({ UserID, ProductID });
    if (exists.length > 0) {
      res.json({
        Message: "Item Alerady Added to Favorites",
        exist: true,
        Product: exists,
      });
    } else {
      const instance = new FavoritesModel(data);
      await instance.save();
      res.json({
        Message: "Added to Favorites Successfully",
        Instance: instance,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
FavoriteRouter.delete("/delete/:id", authenticator, async (req, res) => {
  let id = req.params.id;
  try {
    const deleted = await FavoritesModel.findByIdAndDelete({ _id: id });
    res.json({
      Message: "Removed From Favorites Successfully",
      Removed: deleted,
    });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
module.exports = { FavoriteRouter };
