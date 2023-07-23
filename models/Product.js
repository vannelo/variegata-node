const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  id: String,
  uuid: String,
  name: String,
  slug: String,
  description: String,
  price: Number,
  salePrice: Number,
  isAuction: Boolean,
  endTime: String,
  mainImg: String,
  storeId: String,
  categoryId: String,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("Product", productSchema);
