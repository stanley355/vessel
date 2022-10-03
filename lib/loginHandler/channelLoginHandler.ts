import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import jsCookie from "js-cookie";
import fetcher from "../fetcher";
import { WARNING_MSG } from "../warning-messages";
import Router from "next/router";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const channelLoginHandler = async (token: any) => {
  const credential: any = jwtDecode(token);

  const loginRes = await fetcher(
    `${BASE_URL}/api/channel/login/?owner_id=${credential.id}`,
    {}
  );

  if (loginRes.data && loginRes.data.token) {
    return loginRes.data.token;
  } else {
    return null;
  }
};

export default channelLoginHandler;
