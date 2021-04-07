import { gql } from "apollo-server-express";

const typeDef = gql`
  type Store {
    skins: [Skin]
  }

  extend type Query {
    store(username: String!, password: String!): Store
  }
`;

export default typeDef;
