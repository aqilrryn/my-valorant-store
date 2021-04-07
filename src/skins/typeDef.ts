import { gql } from "apollo-server-express";

const typeDef = gql`
  type Skin {
    uuid: String
    displayName: String
    displayIcon: String
    cost: Int
  }

  extend type Query {
    skins: [Skin]
  }
`;

export default typeDef;
