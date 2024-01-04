const slug = require("slug");
const Product = require("../models/Product");
const ProductPhoto = require("../models/ProductPhoto");
const Store = require("../models/Store");
const Category = require("../models/Category");
const User = require("../models/User");
const Bid = require("../models/Bid");
const Review = require("../models/Review");

module.exports = {
  Query: {
    async getProducts(_, __, ___) {
      return await Product.find({});
    },
    async searchProducts(_, { searchTerm }, ___) {
      const products = await Product.find({});
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    async product(_, { id }, __) {
      return await Product.findById(id);
    },
    async productPhoto(_, { id }, __) {
      return await ProductPhoto.findById(id);
    },
    async getStores(_, __, ___) {
      return await Store.find({});
    },
    async store(_, { slug }, __) {
      return await Store.findOne({ slug: slug });
    },
    async category(_, { id }, __) {
      return await Category.findById(id);
    },
    async user(_, { id }, __) {
      return await User.findById(id);
    },
    async getProductBids(_, { productId }, __) {
      return await Bid.find({ productId: productId });
    },
    async getRelatedAuctions(_, { productId }, __) {
      const products = await Product.find({});
      const product = await Product.findById(productId);
      const productNameArr = product.name.split(" ");
      let productsArr = [];

      // Find products that match the words in the product name
      for (const word of productNameArr) {
        const productsFound = products.filter((product) =>
          product.name.toLowerCase().includes(word.toLowerCase())
        );
        if (productsFound.length > 0) {
          productsArr = [...productsArr, ...productsFound];
        }
      }

      // If productsArr length is not greater than 12, add random products
      if (productsArr.length < 12) {
        const randomProducts = await Product.aggregate([
          { $sample: { size: 12 - productsArr.length } },
        ]);
        productsArr = [...productsArr, ...randomProducts];
      }

      // Shuffle the array of results
      const shuffled = productsArr
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      return shuffled;
    },
  },
  Product: {
    store: async (parent, _, __) => {
      const id = parent.storeId;
      return Store.findById(id);
    },
    photos: async (parent, _, __) => {
      const photos = await ProductPhoto.find({});
      const id = parent._id.toString();
      return photos.filter((photo) => photo.productId === id);
    },
    bids: async (parent, _, __) => {
      const bids = await Bid.find({});
      const productId = parent._id.toString();
      return bids.filter((bid) => bid.productId === productId);
    },
  },
  Store: {
    products: async (parent, _, __) => {
      const products = await Product.find({});
      const id = parent._id.toString();
      return products.filter((product) => product.storeId === id);
    },
    reviews: async (parent, _, __) => {
      const reviews = await Review.find({});
      const id = parent._id.toString();
      return reviews.filter((review) => review.storeId === id);
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
    async createUser(_, { userInput: { email, aws_id } }) {
      const createdUser = new User({
        email: email,
        aws_id: aws_id,
      });
      const res = await createdUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async createBid(_, { bidInput: { productId, userId, amount } }) {
      const date = new Date();
      const CSToffSet = -360;
      const offset = CSToffSet * 60 * 1000;
      const CSTTime = new Date(date.getTime() + offset);
      const CSTFinalTime = new Date(CSTTime).toISOString();
      const productBids = await Bid.find({ productId: productId });

      if (productBids.length === 0) {
        if (amount > 1000) {
          const error = {
            code: 403,
            message:
              "¡No tan rápido! el monto máximo de la primera oferta es de $1,000.00",
          };
          throw new Error(JSON.stringify(error));
        }
        const createdBid = new Bid({
          productId: productId,
          userId: userId,
          amount: parseInt(amount),
          timestamp: CSTFinalTime,
        });
        const res = await createdBid.save();
        return {
          id: res.id,
          ...res._doc,
        };
      }

      const sortedBids = await Bid.find({ productId: productId }).sort({
        amount: -1,
      });
      const greatestBid = sortedBids[0].amount;

      // Currency format conversion
      const formattedAmount = greatestBid.toLocaleString("en", {
        style: "currency",
        currency: "USD",
      });

      // Validating difference between new bid and greatest bid
      if (amount - greatestBid > 100) {
        const error = {
          code: 403,
          message:
            "¡No tan rápido! el incremento máximo por oferta es de $100.00",
        };
        throw new Error(JSON.stringify(error));
      }

      // Validating new bid is greater than greatest bid
      if (amount > greatestBid) {
        const createdBid = new Bid({
          productId: productId,
          userId: userId,
          amount: parseInt(amount),
          timestamp: CSTFinalTime,
        });
        const res = await createdBid.save();
        return {
          id: res.id,
          ...res._doc,
        };
      } else {
        const error = {
          code: 403,
          message:
            "El monto de la oferta debe ser mayor al monto más alto de la subasta: " +
            formattedAmount,
        };
        throw new Error(JSON.stringify(error));
      }
    },
    async createReview(
      _,
      { reviewInput: { storeId, userId, rating, comment } }
    ) {
      // If the user has already reviewed the store, throw error
      const userReviews = await Review.find({ userId: userId });
      const userReviewsIds = userReviews.map((review) => review.storeId);
      if (userReviewsIds.includes(storeId)) {
        const error = {
          code: 403,
          message: "Ya has reseñado esta tienda",
        };
        throw new Error(JSON.stringify(error));
      }

      // Otherwise, create the review
      const createdReview = new Review({
        storeId: storeId,
        userId: userId,
        rating: rating,
        comment: comment,
        createdAt: new Date().toISOString(),
      });
      const res = await createdReview.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
