import axios from "axios";

interface IFetcherConfig {
  method?: any;
  headers?: any;
  data?: any;
}

const fetcher = async (url: string, config: IFetcherConfig) => {
  try {
    const { data } = await axios({
      url,
      method: config.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(config.headers && { ...config.headers }),
      },
      data: config.data ?? {},
    });
    return data;
  } catch (err) {
    return {
      error: err,
      data: null,
    };
  }
};

export default fetcher;
