const mongoose = require("mongoose");
const favoriteSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  discount: { type: Number, required: true },
  description: { type: String, required: true },
  UserID: { type: String, required: true },
  UserName: { type: String, required: true },
  ProductID: { type: String, required: true },
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
const FavoritesModel = mongoose.model("favorite", favoriteSchema);

module.exports = { FavoritesModel };
