const axios = require("axios").default;
import { AuthenticationError } from "apollo-server-errors";
import { Balance } from "src/player/types";
import tough, { CookieJar } from "tough-cookie";

const axiosCookieJarSupport = require("axios-cookiejar-support").default;

axiosCookieJarSupport(axios);

const OPT_IN_URL = "https://playvalorant.com/opt_in";
const AUTH_URL = "https://auth.riotgames.com/api/v1/authorization";
const ENTITLEMENTS_URL = "https://entitlements.auth.riotgames.com/api/token/v1";
const USER_URL = "https://auth.riotgames.com/userinfo";

type Skin = {
  name: string;
  id: string;
  cost?: number;
};

type StoreOffer = {
  OfferID: string;
  IsDirectPurchase: boolean;
  StartDate: string;
  Cost: Cost;
  Rewards: Reward[];
};

type Cost = {
  [id: string]: number;
};

type Reward = {
  ItemTypeID: string;
  ItemID: string;
  Quantity: number;
};

const authenticate = async (
  username: string,
  password: string
): Promise<
  | {
      headers: {
        Authorization: string;
        "X-Riot-Entitlements-JWT"?: string | undefined;
      };
      userId: string;
      cookieJar: CookieJar;
    }
  | undefined
> => {
  const cookieJar = new tough.CookieJar();

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

  if (!response) throw new Error("Unable to authenticate");

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

  const authParamMap = new Map<string, string>();

  response.data.response.parameters.uri
    .toString()
    .split("https://playvalorant.com/opt_in#")[1]
    .split("&")
    .forEach((param: string) =>
      authParamMap.set(param.split("=")[0], param.split("=")[1])
    );

  let headers: { Authorization: string; "X-Riot-Entitlements-JWT"?: string } = {
    Authorization: `Bearer ${authParamMap.get("access_token")}`,
  };

  response = await axios.post(
    ENTITLEMENTS_URL,
    {},
    {
      jar: cookieJar,
      withCredentials: true,
      headers,
    }
  );

  if (!response) throw new Error("Unable to fetch entitlements");

  if (response?.data?.entitlements_token.constructor === String)
    authParamMap.set("entitlements_token", response?.data?.entitlements_token);

  response = await axios.post(
    USER_URL,
    {},
    {
      jar: cookieJar,
      withCredentials: true,
      headers,
    }
  );

  if (!response) throw new Error("Unable to fetch user info");

  const userId = response.data?.sub;

  headers = {
    ...headers,
    "X-Riot-Entitlements-JWT": authParamMap.get("entitlements_token"),
  };

  return { headers, userId, cookieJar };
};

export const getValorantClientVersion = async (): Promise<
  string | undefined
> => {
  const { data } = await axios.get(`https://valorant-api.com/v1/version`);

  if (!data) return undefined;

  const versionData = data.data as {
    branch: string;
    version: string;
    buildVersion: string;
    buildData: string;
  };

  return `${versionData?.branch}-shipping-${versionData?.buildVersion}-${
    versionData?.version.split(".").reverse()[0]
  }`;
};

export const getPlayerStore = async (username: string, password: string) => {
  let auth = undefined;

  try {
    auth = await authenticate(username, password);
  } catch (error) {
    throw new AuthenticationError("Unauthorized");
  }

  const headers = auth?.headers;
  const userId = auth?.userId;
  const cookieJar = auth?.cookieJar;

  if (!headers || !userId) return undefined;

  let response = await axios.get(
    `https://pd.eu.a.pvp.net/store/v2/storefront/${userId}`,
    {
      jar: cookieJar,
      withCredentials: true,
      headers,
    }
  );

  const itemIds: string[] =
    response.data["SkinsPanelLayout"]["SingleItemOffers"];

  const clientVersion = await getValorantClientVersion();

  if (!clientVersion) return;

  response = await axios.get(
    `https://shared.eu.a.pvp.net/content-service/v2/content`,
    {
      jar: cookieJar,
      withCredentials: true,
      headers: {
        ...headers,
        "X-Riot-ClientVersion": clientVersion,
        "X-Riot-ClientPlatform": Buffer.from(
          JSON.stringify({
            platformType: "PC",
            platformOS: "Windows",
            platformOSVersion: "10.0.19042.1.256.64bit",
            platformChipset: "Unknown",
          })
        ).toString("base64"),
      },
    }
  );

  const skins: Skin[] = (response.data["Skins"] as any[])
    .concat(response.data["Chromas"] as any[])
    .concat(response.data["SkinLevels"] as any[])
    .map((s: { Name: string; ID: string }) => ({
      name: s.Name,
      id: s.ID.toLowerCase(),
    }));

  response = await axios.get(`https://pd.eu.a.pvp.net/store/v1/offers/`, {
    jar: cookieJar,
    withCredentials: true,
    headers: {
      ...headers,
      "X-Riot-ClientVersion": clientVersion,
      "X-Riot-ClientPlatform": Buffer.from(
        JSON.stringify({
          platformType: "PC",
          platformOS: "Windows",
          platformOSVersion: "10.0.19042.1.256.64bit",
          platformChipset: "Unknown",
        })
      ).toString("base64"),
    },
  });

  const offers: StoreOffer[] = response.data.Offers;

  const result: (Skin | undefined)[] = itemIds
    .map((itemId) => skins.find((s) => s.id === itemId))
    .map((skin) => {
      if (skin) {
        const offer = offers.find(
          (offer) => offer.OfferID.toLowerCase() === skin.id.toLowerCase()
        );

        return {
          name: skin.name,
          id: skin.id,
          cost: offer ? Object.values(offer.Cost)?.[0] : undefined,
        };
      }
      return undefined;
    });

  return result;
};

export const getPlayerBalance = async (
  username: string,
  password: string
): Promise<Balance | undefined> => {
  let auth = undefined;

  try {
    auth = await authenticate(username, password);
  } catch (error) {
    throw new AuthenticationError("Unauthorized");
  }

  if (!auth) return;

  const { headers, userId, cookieJar } = auth;

  if (!headers || !userId) return undefined;

  let response = await axios.get(
    `https://pd.eu.a.pvp.net/store/v1/wallet/${userId}`,
    {
      jar: cookieJar,
      withCredentials: true,
      headers,
    }
  );

  const balance = response?.data
    ? Object.entries(response.data["Balances"])
    : undefined;

  return {
    valorantPoints: balance?.[0]?.[1] as number,
    radianitePoints: balance?.[1]?.[1] as number,
  };
};
