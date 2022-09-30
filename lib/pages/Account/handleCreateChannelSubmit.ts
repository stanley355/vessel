import Router from "next/router";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import createChannel from "../../channelHandler/createChannel";
import validateCreateChannelInput from "./validateCreateChannelInput";
import { WARNING_MSG } from "../../warning-messages";

const handleCreateChannelSubmit = async (e: any) => {
  e.preventDefault();

  const inputValid = validateCreateChannelInput(e);

  if (inputValid) {
    const token: any = jsCookie.get("token");
    const decode: any = jwtDecode(token);
    const data = {
      userID: decode.id,
      channelName: e.target.channelName.value,
      subscriptionPrice: Number(e.target.subscriptionPrice.value),
    };

    const channelRes = await createChannel(data);

    if (channelRes && channelRes.token) {
      jsCookie.set("token_channel", channelRes.token);
      Router.reload();
    } else {
      alert(WARNING_MSG.TRY_AGAIN);
    }
  }
};

export default handleCreateChannelSubmit;
