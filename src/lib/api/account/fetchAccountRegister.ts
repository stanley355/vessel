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
  const url = `${process.env.AXOLOTL_URL}/accounts/register/`;

  try {
    const { data } = await axios.post(url, payload, {
      headers: {
        Authorization: process.env.AXOLOTL_TOKEN,
      },
    });

    return data;
  } catch (error: any) {
    return axiosErrorHandler(url, error);
  }
};
