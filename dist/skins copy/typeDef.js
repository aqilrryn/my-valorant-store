"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDef = apollo_server_1.gql `
  type Skin {
    uuid: String
    displayName: String
    displayIcon: String
  }

  extend type Query {
    skins: [Skin]
  }
`;
exports.default = typeDef;
//# sourceMappingURL=typeDef.js.map