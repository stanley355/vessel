import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import gmailLoginHandler from "../../lib/loginHandler/gmailLoginHandler";
import { WARNING_MSG } from "../../lib/warning-messages";

interface IGoogleSignIn {
  clientID: string;
}

const GoogleSignInBtn = (props: IGoogleSignIn) => {
  const { clientID } = props;

  console.log(333, clientID);
  return (
    <GoogleOAuthProvider clientId={clientID}>
      <GoogleLogin
        onSuccess={gmailLoginHandler}
        onError={() => alert(WARNING_MSG.TRY_AGAIN)}
        logo_alignment="left"
        theme="filled_blue"
        shape="rectangular"
        width="300"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInBtn;
