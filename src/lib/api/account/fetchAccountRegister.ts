"use server";
import axios from "axios";
import { axiosErrorHandler } from "../axiosErrorHandler";

interface IFetchAccountRegister {
  fullname: string;
  phone_number: string;
  email: string;
  password: string;
}

export const fetchAccountRegister = async (props: IFetchAccountRegister) => {
  const { fullname, phone_number, email, password } = props;

  const payload = { fullname, phone_number, email, password };

  try {
    const { data } = await axios.post(
      "http://localhost:8000/accounts/register/",
      payload,
      {
        headers: {
          Authorization: "ltoloxa",
        },
      }
    );

    return data;
  } catch (error: any) {
    // return {}
    return axiosErrorHandler("zzz", error);
  }
};
