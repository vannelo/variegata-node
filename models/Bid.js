const { model, Schema } = require("mongoose");

const bidSchema = new Schema({
  id: String,
  productId: String,
  userId: String,
  amount: Number,
  timestamp: String,
});

module.exports = model("Bid", bidSchema);
