import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import jsCookie from "js-cookie";
import fetcher from "../fetcher";
import { WARNING_MSG } from "../warning-messages";
import Router from "next/router";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const channelLoginHandler = async (token: any) => {
  const credential: any = jwtDecode(token);
  const URL = `${BASE_URL}/api/channel/login/?owner_id=${credential.id}`;

  const loginRes = await fetcher(URL, {});

console.log(loginRes);
  // if (loginRes && loginRes.token) {
  //   return loginRes.token;
  // } else {
  //   return null;
  // }
};

export default channelLoginHandler;
