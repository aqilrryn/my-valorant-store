"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Skin_1 = __importDefault(require("./Skin"));
const resolvers = {
    Query: {
        skins: () => Skin_1.default.all(),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map