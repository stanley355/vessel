// 'use server'

import { AxiosError } from "axios";

export const axiosErrorHandler = (path: string, error: AxiosError) => {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  if (error.response) {
    const { data, status, statusText, headers } = error.response;
    const errorRes = {
      status,
      statusText,
      headers: JSON.stringify(headers),
      data,
    };
    
    console.error(`Response Error: ${path}`, errorRes);
    return errorRes;
  }

  // Handle other errors like Request or Unknown Error
  const { message, config } = error;

  const errorRes = {
    headers: JSON.stringify(config?.headers),
    method: config?.method,
    url: config?.url,
    data: config?.data,
    message,
  };

  console.error(`Request Error: ${path}`, errorRes);
  return errorRes;
};
