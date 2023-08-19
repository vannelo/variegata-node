const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    product(id: ID!): Product!
    getProducts: [Product]
    productPhoto(id: ID!): ProductPhoto!
    getStores: [Store]
    store(slug: String!): Store
    category(id: ID!): Category!
    user(id: ID!): User!
  }
  type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(ID: ID!): Boolean
    updateProduct(ID: ID!, productInput: ProductUpdateInput): Boolean
    createProductPhoto(productPhotoInput: ProductPhotoInput): ProductPhoto!
    createStore(storeInput: StoreInput): Store!
    createCategory(categoryInput: CategoryInput): Category!
    createUser(userInput: UserInput): User!
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
    _id: String
    asdasd: String
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
    password: String
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
    uuid: String!
    name: String
    username: String
    email: String
    password: String
    description: String
    photo: String
    city: String
    phone: String
    address: AddressSchema
    createdAt: String
    updatedAt: String
  }
`;
