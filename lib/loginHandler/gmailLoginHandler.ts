import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import jsCookie from "js-cookie";
import fetcher from "../fetcher";
import { WARNING_MSG } from "../warning-messages";

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
    jsCookie.set("token", loginRes.data.token);
    window.location.reload();
  } else {
    alert(WARNING_MSG.TRY_AGAIN);
  }
};

export default gmailSignInHandler;
