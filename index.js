const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const MONGODB =
  "mongodb+srv://vannelo:Valeria001Valeria@variegata.115oaew.mongodb.net/?retryWrites=true&w=majority";
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({ token: req.headers.token }),
});
(async function main() {
  await mongoose.connect(MONGODB, { useNewUrlParser: true });
  console.log("MONGO STARTED");
  const { url } = await server.listen(80);
  console.log(`🚀  SERVER READY AT ${url}`);
})();
