"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDef = apollo_server_express_1.gql `
  type Store {
    skins: [Skin]
  }

  extend type Query {
    store(username: String!, password: String!): Store
  }
`;
exports.default = typeDef;
//# sourceMappingURL=typeDef.js.map