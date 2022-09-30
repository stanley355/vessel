import { useState, useEffect } from "react";
import jsCookie from 'js-cookie';

const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const token = jsCookie.get('token');

  useEffect(() => {
    if (token && !authenticated) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return authenticated;
}

export default useAuthenticated;

