const { model, Schema } = require("mongoose");

const reviewSchema = new Schema({
  id: String,
  userId: String,
  storeId: String,
  rating: Number,
  comment: String,
  timestamp: String,
});

module.exports = model("Review", reviewSchema);
