const { model, Schema } = require("mongoose");

const productImageSchema = new Schema({
  id: String,
  url: String,
  productId: String,
});

module.exports = model("ProductImage", productImageSchema);
