const mongoose = require("mongoose");

// title,description,price,brand,thumbnail,rating,images[],images2,type,discount

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  discount: { type: Number, required: true },
  description: { type: String, required: true },
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
const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
