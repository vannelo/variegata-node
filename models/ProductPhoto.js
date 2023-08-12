const { model, Schema } = require("mongoose");

const productsPhotoSchema = new Schema({
  id: String,
  url: String,
  productId: String,
});

module.exports = model("ProductsPhoto", productsPhotoSchema);
