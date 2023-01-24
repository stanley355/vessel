import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import gmailLoginHandler from "../../lib/loginHandler/gmailLoginHandler";
import useResponsive from "../../lib/hooks/useResponsive";
import { WARNING_MSG } from "../../lib/warning-messages";

interface IGoogleSignIn {
  clientID: string;
}

const GoogleSignInBtn = (props: IGoogleSignIn) => {
  const { clientID } = props;

  const { isDesktop } = useResponsive();

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <GoogleLogin
        onSuccess={gmailLoginHandler}
        onError={() => alert(WARNING_MSG.TRY_AGAIN)}
        logo_alignment="left"
        shape="rectangular"
        width="300"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInBtn;
