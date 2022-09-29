import { useState, useEffect } from "react";
import jsCookie from "js-cookie";

const useAuthenticated = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenCookie = jsCookie.get("token");
    if (tokenCookie) setToken(tokenCookie);
  }, [token]);

  return token;
};

export default useAuthenticated;
