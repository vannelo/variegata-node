const { model, Schema } = require("mongoose");

const AddressSchema = new Schema({
  street: String,
  number1: String,
  number2: String,
  neighborhood: String,
  city: String,
  state: String,
  postalCode: String,
  phone: String,
});
const userSchema = new Schema({
  id: String,
  name: String,
  username: String,
  email: String,
  password: String,
  description: String,
  photo: String,
  city: String,
  phone: String,
  address: AddressSchema,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("User", userSchema);
