import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import skins from "./skins";
import store from "./store";
import weapons from "./weapons";
import player from "./player";

const typeDef = gql`
  type Query
`;

const server = new ApolloServer({
  typeDefs: [
    typeDef,
    weapons.typeDef,
    skins.typeDef,
    store.typeDef,
    player.typeDef,
  ],
  resolvers: [
    weapons.resolvers,
    skins.resolvers,
    store.resolvers,
    player.resolvers,
  ],
  introspection: true,
  playground: true,
});

server.start().then(() => {
  const app = express();
  server.applyMiddleware({ app });

  new Promise((resolve) =>
    // @ts-ignore
    app.listen({ port: process.env.PORT || 4000 }, resolve)
  ).then(() => console.log(`🚀 Server ready at url${server.graphqlPath}`));
});
