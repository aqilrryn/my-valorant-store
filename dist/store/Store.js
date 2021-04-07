"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rsoService_1 = require("../services/rsoService");
const Skin_1 = __importDefault(require("../skins/Skin"));
class Store {
    static async playerStore(username, password) {
        const store = await rsoService_1.getPlayerStore(username, password);
        const skins = await Skin_1.default.all();
        return {
            skins: (store !== null && store !== void 0 ? store : []).map((s) => {
                var _a, _b;
                const skin = skins.find((skin) => skin.displayName === (s === null || s === void 0 ? void 0 : s.name));
                return {
                    uuid: (_a = s === null || s === void 0 ? void 0 : s.id) !== null && _a !== void 0 ? _a : "",
                    cost: s === null || s === void 0 ? void 0 : s.cost,
                    displayName: (_b = s === null || s === void 0 ? void 0 : s.name) !== null && _b !== void 0 ? _b : "",
                    displayIcon: skin === null || skin === void 0 ? void 0 : skin.displayIcon,
                };
            }),
        };
    }
}
exports.default = Store;
//# sourceMappingURL=Store.js.map