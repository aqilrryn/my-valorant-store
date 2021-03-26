import { gql } from "apollo-server";

const typeDef = gql`
  type Store {
    skins: [Skin]
  }

  extend type Query {
    store: Store
  }
`;

export default typeDef;
