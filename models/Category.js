const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  id: String,
  name: String,
  slug: String,
  description: String,
});

module.exports = model("Category", categorySchema);
