import axios from "axios";
import getConfig from "next/config";

interface IFetcherConfig {
  method?: any;
  headers?: any;
  data?: any;
}

const fetcher = async (url: string, config: IFetcherConfig ) => {
  let response;

  try {
    response = await axios({
      url,
      method: config.method ?? 'GET',
      headers: config.headers ? config.headers : {},
      data: config.data,
    });
  } catch (err) {
    response = {
      error: err,
      data: null,
    };
  }

  return response;
};

export default fetcher;
