const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    product(id: ID!): Product!
    getProducts: [Product]
    searchProducts(searchTerm: String): [Product]
    productPhoto(id: ID!): ProductPhoto!
    productBids(productId: String!): [Bid]
    getProductBids(productId: String!): [Bid]
    getStores: [Store]
    store(slug: String!): Store
    category(id: ID!): Category!
    user(id: ID!): User!
    getRelatedAuctions(productId: String!): [Product]
    checkUser: User
  }
  type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(ID: ID!): Boolean
    updateProduct(ID: ID!, productInput: ProductUpdateInput): Boolean
    createProductPhoto(productPhotoInput: ProductPhotoInput): ProductPhoto!
    createStore(storeInput: StoreInput): Store!
    createCategory(categoryInput: CategoryInput): Category!
    createUser(userInput: UserInput): User!
    createBid(bidInput: BidInput): Bid!
    createReview(reviewInput: ReviewInput): Review!
  }
  # Product types
  input ProductInput {
    name: String!
    description: String
    price: Float!
    salePrice: Float
    isAuction: Boolean
    endTime: String
    storeId: String
    categoryId: String
  }
  input ProductUpdateInput {
    name: String
    description: String
    price: Float
    salePrice: Float
    isAuction: Boolean
    endTime: String
    storeId: String
    categoryId: String
  }
  type Product {
    _id: ID
    name: String!
    slug: String
    description: String
    price: Float!
    salePrice: Float
    isAuction: Boolean
    endTime: String
    storeId: String
    store: Store
    categoryId: String
    photos: [ProductPhoto]
    bids: [Bid]
    createdAt: String!
    updatedAt: String
  }
  # Gallery
  input ProductPhotoInput {
    productId: String
    url: String!
  }
  type ProductPhoto {
    productId: String
    url: String!
  }
  # Store types
  input StoreInput {
    name: String!
    logo: String
    facebook: String
    instagram: String
    city: String
    phone: String
    description: String
  }
  type Store {
    _id: String
    name: String!
    slug: String
    description: String
    logo: String
    facebook: String
    instagram: String
    city: String
    phone: String
    products: [Product]
    reviews: [Review]
  }
  # Category types
  input CategoryInput {
    name: String!
    description: String
  }
  type Category {
    uuid: String!
    name: String!
    slug: String
    description: String
  }

  # User types
  input UserAddressInput {
    street: String
    number1: String
    number2: String
    neighborhood: String
    city: String
    state: String
    postalCode: String
    phone: String
  }
  input UserInput {
    name: String
    username: String
    email: String
    aws_id: String
    description: String
    photo: String
    city: String
    phone: String
    address: UserAddressInput
  }
  type AddressSchema {
    street: String
    number1: String
    number2: String
    neighborhood: String
    city: String
    state: String
    postalCode: String
    phone: String
  }
  type User {
    name: String
    username: String
    email: String
    aws_id: String
    description: String
    photo: String
    city: String
    phone: String
    address: AddressSchema
    createdAt: String
    updatedAt: String
  }
  input BidInput {
    productId: String
    userId: String
    amount: Float
  }
  type Bid {
    _id: String
    productId: String
    userId: String
    amount: Float
    timestamp: String
  }
  input ReviewInput {
    userId: String
    storeId: String
    rating: Float
    comment: String
  }
  type Review {
    _id: String
    userId: String
    storeId: String
    rating: Float
    comment: String
    timestamp: String
  }
`;
