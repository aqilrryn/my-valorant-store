"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerStore = exports.getValorantClientVersion = void 0;
const axios = require("axios").default;
const apollo_server_errors_1 = require("apollo-server-errors");
const tough_cookie_1 = __importDefault(require("tough-cookie"));
const axiosCookieJarSupport = require("axios-cookiejar-support").default;
axiosCookieJarSupport(axios);
const OPT_IN_URL = "https://playvalorant.com/opt_in";
const AUTH_URL = "https://auth.riotgames.com/api/v1/authorization";
const ENTITLEMENTS_URL = "https://entitlements.auth.riotgames.com/api/token/v1";
const USER_URL = "https://auth.riotgames.com/userinfo";
const authenticate = async (username, password) => {
    var _a, _b, _c;
    const cookieJar = new tough_cookie_1.default.CookieJar();
    const authData = {
        client_id: "play-valorant-web-prod",
        nonce: "1",
        redirect_uri: OPT_IN_URL,
        response_type: "token id_token",
    };
    let response = await axios.post(AUTH_URL, authData, {
        jar: cookieJar,
        withCredentials: true,
    });
    if (!response)
        throw new Error("Unable to authenticate");
    const credentials = {
        type: "auth",
        username,
        password,
    };
    response = await axios.put(AUTH_URL, credentials, {
        jar: cookieJar,
        withCredentials: true,
    });
    if (!response)
        throw new Error("Unable to authenticate with the provided credentials");
    const authParamMap = new Map();
    response.data.response.parameters.uri
        .toString()
        .split("https://playvalorant.com/opt_in#")[1]
        .split("&")
        .forEach((param) => authParamMap.set(param.split("=")[0], param.split("=")[1]));
    let headers = {
        Authorization: `Bearer ${authParamMap.get("access_token")}`,
    };
    response = await axios.post(ENTITLEMENTS_URL, {}, {
        jar: cookieJar,
        withCredentials: true,
        headers,
    });
    if (!response)
        throw new Error("Unable to fetch entitlements");
    if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.entitlements_token.constructor) === String)
        authParamMap.set("entitlements_token", (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.entitlements_token);
    response = await axios.post(USER_URL, {}, {
        jar: cookieJar,
        withCredentials: true,
        headers,
    });
    if (!response)
        throw new Error("Unable to fetch user info");
    const userId = (_c = response.data) === null || _c === void 0 ? void 0 : _c.sub;
    headers = {
        ...headers,
        "X-Riot-Entitlements-JWT": authParamMap.get("entitlements_token"),
    };
    return { headers, userId, cookieJar };
};
const getValorantClientVersion = async () => {
    const { data } = await axios.get(`https://valorant-api.com/v1/version`);
    if (!data)
        return undefined;
    const versionData = data.data;
    return `${versionData === null || versionData === void 0 ? void 0 : versionData.branch}-shipping-${versionData === null || versionData === void 0 ? void 0 : versionData.buildVersion}-${versionData === null || versionData === void 0 ? void 0 : versionData.version.split(".").reverse()[0]}`;
};
exports.getValorantClientVersion = getValorantClientVersion;
const getPlayerStore = async (username, password) => {
    let auth = undefined;
    try {
        auth = await authenticate(username, password);
    }
    catch (error) {
        throw new apollo_server_errors_1.AuthenticationError("Unauthorized");
    }
    const headers = auth === null || auth === void 0 ? void 0 : auth.headers;
    const userId = auth === null || auth === void 0 ? void 0 : auth.userId;
    const cookieJar = auth === null || auth === void 0 ? void 0 : auth.cookieJar;
    if (!headers || !userId)
        return undefined;
    let response = await axios.get(`https://pd.eu.a.pvp.net/store/v2/storefront/${userId}`, {
        jar: cookieJar,
        withCredentials: true,
        headers,
    });
    const itemIds = response.data["SkinsPanelLayout"]["SingleItemOffers"];
    const clientVersion = await exports.getValorantClientVersion();
    if (!clientVersion)
        return;
    response = await axios.get(`https://shared.eu.a.pvp.net/content-service/v2/content`, {
        jar: cookieJar,
        withCredentials: true,
        headers: {
            ...headers,
            "X-Riot-ClientVersion": clientVersion,
            "X-Riot-ClientPlatform": Buffer.from(JSON.stringify({
                platformType: "PC",
                platformOS: "Windows",
                platformOSVersion: "10.0.19042.1.256.64bit",
                platformChipset: "Unknown",
            })).toString("base64"),
        },
    });
    const skins = response.data["Skins"]
        .concat(response.data["Chromas"])
        .concat(response.data["SkinLevels"])
        .map((s) => ({
        name: s.Name,
        id: s.ID.toLowerCase(),
    }));
    response = await axios.get(`https://pd.eu.a.pvp.net/store/v1/offers/`, {
        jar: cookieJar,
        withCredentials: true,
        headers: {
            ...headers,
            "X-Riot-ClientVersion": clientVersion,
            "X-Riot-ClientPlatform": Buffer.from(JSON.stringify({
                platformType: "PC",
                platformOS: "Windows",
                platformOSVersion: "10.0.19042.1.256.64bit",
                platformChipset: "Unknown",
            })).toString("base64"),
        },
    });
    const offers = response.data.Offers;
    const result = itemIds
        .map((itemId) => skins.find((s) => s.id === itemId))
        .map((skin) => {
        var _a;
        if (skin) {
            const offer = offers.find((offer) => offer.OfferID.toLowerCase() === skin.id.toLowerCase());
            return {
                name: skin.name,
                id: skin.id,
                cost: offer ? (_a = Object.values(offer.Cost)) === null || _a === void 0 ? void 0 : _a[0] : undefined,
            };
        }
        return undefined;
    });
    return result;
};
exports.getPlayerStore = getPlayerStore;
//# sourceMappingURL=rsoService.js.map