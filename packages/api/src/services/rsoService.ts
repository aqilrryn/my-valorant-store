const axios = require("axios").default;
import tough from "tough-cookie";
import { scrape } from "./scrapingService";

const axiosCookieJarSupport = require("axios-cookiejar-support").default;

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const OPT_IN_URL = "https://playvalorant.com/opt_in";
const AUTH_URL = "https://auth.riotgames.com/api/v1/authorization";
const ENTITLEMENTS_URL = "https://entitlements.auth.riotgames.com/api/token/v1";
const USER_URL = "https://auth.riotgames.com/userinfo";

export const authenticate = async (): Promise<string> => {
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

  const credentials = {
    type: "auth",
    username: process.env["USERNAME"],
    password: process.env["PASSWORD"],
  };

  response = await axios.put(AUTH_URL, credentials, {
    jar: cookieJar,
    withCredentials: true,
  });

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

  const userId = response.data?.sub;

  headers = {
    ...headers,
    "X-Riot-Entitlements-JWT": authParamMap.get("entitlements_token"),
  };

  response = await axios.get(
    `https://pd.eu.a.pvp.net/store/v2/storefront/${userId}`,
    {
      jar: cookieJar,
      withCredentials: true,
      headers,
    }
  );

  const itemIds: string[] =
    response.data["SkinsPanelLayout"]["SingleItemOffers"];

  response = await axios.get(
    `https://shared.eu.a.pvp.net/content-service/v2/content`,
    {
      jar: cookieJar,
      withCredentials: true,
      headers: {
        ...headers,
        "X-Riot-ClientVersion": "release-02.01-shipping-6-511946",
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

  const skins: { name: string; id: string }[] = (response.data[
    "Skins"
  ] as any[])
    .concat(response.data["Chromas"] as any[])
    .concat(response.data["SkinLevels"] as any[])
    .map((s: { Name: string; ID: string }) => ({
      name: s.Name,
      id: s.ID.toLowerCase(),
    }));

  console.log(itemIds);

  const storeItems = itemIds.map((itemId) =>
    skins.find((s) => s.id === itemId)
  );

  console.log(storeItems);

  storeItems.forEach((item) => {
    if (item) {
      scrape(
        "https://valorant.fandom.com/wiki/Weapon_Skins",
        item.name.split(" ")[0],
        item.name.split(" ")[1]
      ).then((result) => {
        console.log(result);
      });
    }
  });

  return "";
};
