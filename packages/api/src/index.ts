import { ApolloServer, gql } from "apollo-server";
import skins from "./skins";
import store from "./store";
import weapons from "./weapons";

// Check if required env variables exist
require("dotenv-safe").config();

const typeDef = gql`
  type Query
`;

/* axios.interceptors.response.use((response) => {
  return response.status === 200 ? response.data : response;
}); */

// Merge types & resolvers
const server = new ApolloServer({
  typeDefs: [typeDef, weapons.typeDef, skins.typeDef, store.typeDef],
  resolvers: [weapons.resolvers, skins.resolvers, store.resolvers],
});

// Start server
server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
