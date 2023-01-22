const mongoose = require("mongoose");

// title,description,price,brand,thumbnail,rating,images[],images2,type,discount

const reviewsSchema = mongoose.Schema({
  UserID: { type: String, required: true },
  UserName: { type: String, required: true },
  ProductID: { type: String, required: true },
  Type: { type: String, required: true },
  ReviewBody: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});
const ReviewModel = mongoose.model("reviews", reviewsSchema);

module.exports = { ReviewModel };
