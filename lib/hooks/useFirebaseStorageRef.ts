import getConfig from "next/config";
import { initializeApp } from "firebase/app";
import {
  ref,
  getStorage,
} from "firebase/storage";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const useFirebaseStorageRef = async (fileName: string) => {
  const configURL = `${BASE_URL}/api/firebase-config/`;
  const firebaseConfig: any = await fetcher(configURL, {});
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseStorage = getStorage(firebaseApp);
  const storageRef = ref(firebaseStorage, fileName);

  return storageRef;
};

export default useFirebaseStorageRef;
