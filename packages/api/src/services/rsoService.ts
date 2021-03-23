const axios = require("axios").default;
import { AxiosResponse } from "axios";
import tough from "tough-cookie";

const axiosCookieJarSupport = require("axios-cookiejar-support").default;

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const OPT_IN_URL = "https://playvalorant.com/opt_in";
const AUTH_URL = "https://auth.riotgames.com/api/v1/authorization";

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

  return response.data.response.parameters.uri
    .toString()
    .split("https://playvalorant.com/opt_in#")[1];
};
