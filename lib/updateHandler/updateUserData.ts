import getConfig from "next/config";
import fetcher from "../fetcher";

interface INewData {
  id: string;
  fullname: string;
  email: string;
  password?: string;
  phone_number?: string;
  has_channel: boolean;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const updateUserData = async (newData: INewData) => {
  const authorRes = await fetcher(`${KONTENKU_URL}/api/account/user/`, {
    method: "PUT",
    data: newData,
  });

  return authorRes;
};

export default updateUserData;
