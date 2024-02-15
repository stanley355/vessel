"use server";
import axios from "axios";
import { axiosErrorHandler } from "../axiosErrorHandler";

export const fetchGMapsTextSearch = async (query: string) => {
  const googleUrl = new URL(`https://maps.googleapis.com/maps/api/place/textsearch/json`);
  googleUrl.searchParams.append('key', String(process.env.GOOGLE_API_KEY));
  googleUrl.searchParams.append('query', query);

  try {
    const { data } = await axios.get(googleUrl.toString());

    return data;
  } catch (error: any) {
    return axiosErrorHandler(googleUrl.toString(), error);
  }
};
