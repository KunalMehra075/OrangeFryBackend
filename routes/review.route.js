const express = require("express");
const { ReviewModel } = require("../models/reviews.model");
const { authenticator } = require("../middlewares/authenticator.middleware");
const ReviewRouter = express.Router();

ReviewRouter.get("/", async (req, res) => {
  let query = req.query;
  console.log(query);
  try {
    const Review = await ReviewModel.find(query);
    res.json({ Review });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
ReviewRouter.post("/post", async (req, res) => {
  let data = req.body;
  try {
    const instance = new ReviewModel(data);
    await instance.save();
    res.json({ Message: "Added Review Successfully", Instance: instance });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
ReviewRouter.delete("/delete/:id", authenticator, async (req, res) => {
  let id = req.params.id;
  try {
    const deleted = await ReviewModel.findByIdAndDelete({ _id: id });
    res.json({ Message: "Deleted Review Successfully", Deleted: deleted });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
ReviewRouter.patch("/update/:id", authenticator, async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const updated = await ReviewModel.findByIdAndUpdate({ _id: id }, payload);
    res.json({ Message: "Updated Review Successfully", Updated: updated });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
module.exports = { ReviewRouter };
