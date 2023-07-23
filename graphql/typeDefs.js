const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    product(id: ID!): Product!
    getProducts(id: ID): [Product]
    productImage(id: ID!): ProductImage!
    store(id: ID!): Store!
    category(id: ID!): Category!
    user(id: ID!): User!
  }
  type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(ID: ID!): Boolean
    updateProduct(ID: ID!, productInput: ProductUpdateInput): Boolean
    createProductImage(productImageInput: ProductImageInput): ProductImage!
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
    mainImg: String
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
    mainImg: String
    storeId: String
    categoryId: String
  }
  type Product {
    uuid: String!
    name: String!
    slug: String
    description: String
    price: Float!
    salePrice: Float
    isAuction: Boolean
    endTime: String
    mainImg: String
    storeId: String
    categoryId: String
    createdAt: String!
    updatedAt: String
  }
  # Gallery
  input ProductImageInput {
    url: String!
    productId: String
  }
  type ProductImage {
    url: String!
    productId: String
  }
  # Store types
  input StoreInput {
    name: String!
    slug: String
    logo: String
    facebook: String
    instagram: String
    city: String
    phone: String
    description: String
  }
  type Store {
    uuid: String!
    name: String!
    slug: String
    description: String
    logo: String
    facebook: String
    instagram: String
    city: String
    phone: String
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
