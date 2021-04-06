import { ApolloServer } from '../server/node_modules/apollo-server-micro';
import { gql } from '../server/node_modules/apollo-server';
import skins from '../server/src/skins';
import store from '../server/src/store';
import weapons from '../server/src/weapons';

const typeDef = gql`
  type Query
`;

// Merge types & resolvers
export default new ApolloServer({
  typeDefs: [typeDef, weapons.typeDef, skins.typeDef, store.typeDef],
  resolvers: [weapons.resolvers, skins.resolvers, store.resolvers],
  introspection: true,
  playground: true,
}).createHandler({
  path: '/api/graphql',
});
