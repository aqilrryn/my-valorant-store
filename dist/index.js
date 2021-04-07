"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const skins_1 = __importDefault(require("./skins"));
const store_1 = __importDefault(require("./store"));
const weapons_1 = __importDefault(require("./weapons"));
const typeDef = apollo_server_express_1.gql `
  type Query
`;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: [typeDef, weapons_1.default.typeDef, skins_1.default.typeDef, store_1.default.typeDef],
    resolvers: [weapons_1.default.resolvers, skins_1.default.resolvers, store_1.default.resolvers],
    introspection: true,
    playground: true,
});
server.start().then(() => {
    const app = express_1.default();
    server.applyMiddleware({ app });
    new Promise((resolve) => app.listen({ port: process.env.PORT || 4000 }, resolve)).then(() => console.log(`🚀 Server ready at url${server.graphqlPath}`));
});
//# sourceMappingURL=index.js.map