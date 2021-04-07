import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import skins from './skins';
import store from './store';
import weapons from './weapons';

async function startApolloServer() {
  const typeDef = gql`
    type Query
  `;

  const server = new ApolloServer({
    typeDefs: [typeDef, weapons.typeDef, skins.typeDef, store.typeDef],
    resolvers: [weapons.resolvers, skins.resolvers, store.resolvers],
    introspection: true,
    playground: true,
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise(resolve =>
    app.listen({ port: process.env.PORT || 4000 }, () => resolve),
  );

  console.log(`🚀 Server ready at url/${server.graphqlPath}`);

  return { server, app };
}

async () => await startApolloServer();
