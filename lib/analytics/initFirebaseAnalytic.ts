import getConfig from "next/config";
import fetcher from "../fetcher";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const initFirebaseAnalytic = async () => {
  const configURL = `${KONTENKU_URL}/api/firebase-config/`;
  const firebaseConfig: any = await fetcher(configURL, {});

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
};

export default initFirebaseAnalytic;
