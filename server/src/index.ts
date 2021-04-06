import { ApolloServer } from 'apollo-server-micro';
import { gql } from 'apollo-server';
import skins from './skins';
import store from './store';
import weapons from './weapons';

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
