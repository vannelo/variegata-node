const { v4: uuidv4 } = require("uuid");
const slug = require("slug");
const Product = require("../models/Product");
const ProductPhoto = require("../models/ProductPhoto");
const Store = require("../models/Store");
const Category = require("../models/Category");
const User = require("../models/User");

module.exports = {
  Query: {
    async getProducts(_, __, ___) {
      return await Product.find({});
    },

    async productPhoto(_, { id }, __) {
      return await ProductPhoto.findById(id);
    },
    async store(_, { id }, __) {
      return await Store.findById(id);
    },
    async category(_, { id }, __) {
      return await Category.findById(id);
    },
    async user(_, { id }, __) {
      return await User.findById(id);
    },
  },
  Product: {
    photos: (parent, args, context) => {
      console.log(parent);
      return ProductPhoto.find({ productId: parent.id });
    },
  },
  Mutation: {
    async createProduct(
      _,
      {
        productInput: {
          name,
          description,
          price,
          salePrice,
          isAuction,
          endTime,
          storeId,
          categoryId,
        },
      }
    ) {
      const nameSlug = slug(name);
      const createdProduct = new Product({
        uuid: uuidv4(),
        name: name,
        slug: nameSlug,
        description: description,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        price: price,
        salePrice: salePrice,
        isAuction: isAuction,
        endTime: endTime,
        storeId: storeId,
        categoryId: categoryId,
      });
      const res = await createdProduct.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteProduct(_, { ID }) {
      const deleted = (await Product.deleteOne({ _id: ID })).deletedCount;
      return deleted ? true : false;
    },
    async updateProduct(
      _,
      {
        ID,
        productInput: {
          name,
          description,
          price,
          salePrice,
          isAuction,
          endTime,
          storeId,
          categoryId,
        },
      }
    ) {
      const updated = (
        await Product.updateOne(
          { _id: ID },
          {
            updatedAt: new Date().toISOString(),
            name: name,
            description: description,
            price: price,
            salePrice: salePrice,
            isAuction: isAuction,
            endTime: endTime,
            storeId: storeId,
            categoryId: categoryId,
          }
        )
      ).modifiedCount;
      return updated ? true : false;
    },
    async createProductPhoto(_, { productPhotoInput: { url, productId } }) {
      const createdProductPhoto = new ProductPhoto({
        url,
        productId,
      });
      const res = await createdProductPhoto.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async createStore(
      _,
      { storeInput: { name, description, logo, facebook, instagram, phone } }
    ) {
      const nameSlug = slug(name);
      const createdStore = new Store({
        uuid: uuidv4(),
        name: name,
        slug: nameSlug,
        description: description,
        logo: logo,
        facebook: facebook,
        instagram: instagram,
        phone: phone,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      });
      const res = await createdStore.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async createCategory(_, { categoryInput: { name, description } }) {
      const nameSlug = slug(name);
      const createdCategory = new Category({
        uuid: uuidv4(),
        name: name,
        slug: nameSlug,
        description: description,
      });
      const res = await createdCategory.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async createUser(
      _,
      {
        userInput: {
          name,
          username,
          email,
          password,
          photo,
          description,
          city,
        },
      }
    ) {
      const createdUser = new User({
        uuid: uuidv4(),
        name: name,
        username: username,
        email: email,
        password: password,
        photo: photo,
        description: description,
        city: city,
      });
      const res = await createdUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
