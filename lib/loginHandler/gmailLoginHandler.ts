import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import jsCookie from "js-cookie";
import fetcher from "../fetcher";
import channelLoginHandler from "./channelLoginHandler";
import { WARNING_MSG } from "../warning-messages";
import Router from "next/router";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const gmailSignInHandler = async (googleRes: any) => {
  const credential: any = jwtDecode(googleRes.credential);
  const data = {
    fullname: credential.name,
    email: credential.email,
  };

  const loginRes = await fetcher(`${BASE_URL}/api/account/gmail-login`, {
    method: "POST",
    data,
  });

  if (loginRes.data && loginRes.data.token) {
    const credential: any = jwtDecode(loginRes.data.token);

    if (credential.has_channel) {
      const channelToken = await channelLoginHandler(loginRes.data.token);

      if (channelToken) {
        jsCookie.set("token", loginRes.data.token);
        jsCookie.set("token_channel", channelToken);
        window.location.href = "/account/";
      } else {
        alert(WARNING_MSG.TRY_AGAIN);
      }
    } else {
      jsCookie.set("token", loginRes.data.token);
      window.location.href = "/account/";
    }
  } else {
    alert(WARNING_MSG.TRY_AGAIN);
  }
};

export default gmailSignInHandler;
