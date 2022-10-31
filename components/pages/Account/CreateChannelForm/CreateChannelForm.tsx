import React, { useState } from "react";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import CurrencyInput from "react-currency-input-field";
import getFirebaseStorageRef from "../../../../lib/getFirebaseStorageRef";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import createChannel from "../../../../lib/channelHandler/createChannel";
import updateUserData from "../../../../lib/updateHandler/updateUserData";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import styles from "./CreateChannelForm.module.scss";
import Router from "next/router";
import updateBalanceChannel from "../../../../lib/paymentHandler/updateBalanceChannel";

const CreateChannelForm = () => {
  const [hasSubmit, setHasSubmit] = useState(false);
  const [formError, setFormError] = useState("");

  const cleanChannelPrice = (price: string) => {
    const newPrice = price.replace("Rp", "").replace(",", "");
    return Number(newPrice);
  };

  const validateInput = (e: any) => {
    const channelName = e.target.channel_name.value.trim();
    const channelPrice = cleanChannelPrice(e.target.channel_price.value);
    const profileImage = e.target.profile_img.files[0];

    if (!channelName) {
      setFormError("Nama Channel Wajib Diisi!");
      return false;
    }

    if (channelName && channelName.length < 4) {
      setFormError("Nama Channel Minimal 4 huruf!");
      return false;
    }

    if (!channelPrice) {
      setFormError("Harga Berlangganan Wajib Diisi!");
      return false;
    }

    if (channelPrice && channelPrice < 5000) {
      setFormError("Harga Berlangganan minimal Rp5.000 / bulan!");
      return false;
    }

    if (!profileImage) {
      setFormError("Profile Image belum di upload!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const inputValid = validateInput(e);
    setHasSubmit(inputValid);

    if (inputValid) {
      const channelName: string = e.target.channel_name.value.trim();
      const channelPrice: number = cleanChannelPrice(
        e.target.channel_price.value
      );
      const profileImage = e.target.profile_img.files[0];

      const storageRef: any = await getFirebaseStorageRef(
        `/profileImage/${channelName}`
      );
      const uploadTask = uploadBytesResumable(storageRef, profileImage);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {},
        (error: any) => {
          console.error(error);
          setHasSubmit(false);
          alert(WARNING_MSG.TRY_AGAIN);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const token: any = jsCookie.get("token");
            const user: any = jwtDecode(token);

            const payload = {
              userID: user.id,
              channelName: channelName,
              subscriptionPrice: channelPrice,
              profileImgURL: downloadURL,
            };
            const channel = await createChannel(payload);

            if (channel && channel.token) {
              const channelData: any = jwtDecode(channel.token);

              const userPayload = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                has_channel: true,
              };

              const userDataUpdate = await updateUserData(userPayload);

              const balancePayload = {
                userID: user.id,
                channelID: channelData.id,
                channelName: channelData.channel_name,
              };
              const balanceChannelUpdate = await updateBalanceChannel(
                balancePayload
              );

              if (userDataUpdate.token && balanceChannelUpdate.affected > 0) {
                jsCookie.set("token", userDataUpdate.token);
                jsCookie.set("token_channel", channel.token);
                Router.reload();
              } else {
                setFormError(WARNING_MSG.TRY_AGAIN);
                setHasSubmit(false);
              }
            }

            if (channel.error) {
              setFormError(channel.data.error ?? WARNING_MSG.TRY_AGAIN);
              setHasSubmit(false);
            }
          });
        }
      );
    }
  };

  return (
    <div className={styles.create__channel}>
      <div className={styles.title}>Create Channel</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="channel_name">Nama Channel: </label>
          <input
            type="text"
            name="channel_name"
            id="channel_name"
            placeholder="abcde"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="channel_price">Harga Berlangganan (bulan): </label>
          <CurrencyInput
            prefix="Rp"
            id="channel_price"
            name="channel_price"
            placeholder="Rp5,000"
            decimalsLimit={2}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="profile_img">Upload Profile Image: </label>
          <input
            type="file"
            name="profile_img"
            id="profile_img"
            accept="image/*"
          />
        </div>

        {formError && <div className={styles.error}>{formError}</div>}

        <button type="submit" className={styles.cta} disabled={hasSubmit}>
          {hasSubmit ? "Processing..." : "Buat Channel"}
        </button>
      </form>
    </div>
  );
};

export default CreateChannelForm;
