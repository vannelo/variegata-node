const { model, Schema } = require("mongoose");

const storeSchema = new Schema({
  id: String,
  name: String,
  slug: String,
  description: String,
  logo: String,
  facebook: String,
  instagram: String,
  city: String,
  phone: String,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("Store", storeSchema);
