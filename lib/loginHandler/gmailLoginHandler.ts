import getConfig from "next/config";
import Router from "next/router";
import jwtDecode from "jwt-decode";
import jsCookie from "js-cookie";
import fetcher from "../fetcher";
import channelLoginHandler from "./channelLoginHandler";
import { WARNING_MSG } from "../warning-messages";
import createBalance from "../paymentHandler/createBalance";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const gmailLoginHandler = async (googleRes: any) => {
  const loginUser: any = jwtDecode(googleRes.credential);

  const URL = `${KONTENKU_URL}/api/account/gmail-login`;
  const loginConfig = {
    method: "POST",
    data: {
      fullname: loginUser.name,
      email: loginUser.email,
    },
  };

  const loginRes = await fetcher(URL, loginConfig);

  if (loginRes && loginRes.token) {
    const user: any = jwtDecode(loginRes.token);

    const balancePayload = {
      userID: user.id,
    };
    const userBalance: any = await createBalance(balancePayload);

    if (userBalance.identifiers || userBalance.id) {
      if (user.has_channel) {
        const channelLogin: any = await channelLoginHandler(loginRes.token);

        if (channelLogin && channelLogin.token) {
          jsCookie.set("token", loginRes.token);
          jsCookie.set("token_channel", channelLogin.token);
          Router.push("/");
        } else {
          alert(WARNING_MSG.TRY_AGAIN);
        }
      } else {
        jsCookie.set("token", loginRes.token);
        Router.push("/account/");
      }
    } else {
      alert(WARNING_MSG.TRY_AGAIN);
    }
  } else {
    alert(WARNING_MSG.TRY_AGAIN);
  }
};

export default gmailLoginHandler;
