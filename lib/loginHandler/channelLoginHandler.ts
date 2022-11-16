import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const channelLoginHandler = async (token: any) => {
  const credential: any = jwtDecode(token);
  const URL = `${KONTENKU_URL}/api/channel/login/?owner_id=${credential.id}`;

  const loginRes = await fetcher(URL, {});

  return loginRes;
};

export default channelLoginHandler;
