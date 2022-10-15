import React from "react";
import { FaRegGrinWink } from "react-icons/fa";
import getConfig from "next/config";
import Router from "next/router";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import createChannel from "../../../../lib/channelHandler/createChannel";
import updateUserData from "../../../../lib/updateUserData";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import styles from "./CreateChannelForm.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const CreateChannelForm = () => {
  const validateCreateChannelInput = (
    channelName: string,
    subscriptionPrice: number
  ) => {
    if (!channelName) {
      alert("Nama channel wajib diisi!");
      return false;
    }

    if (channelName && channelName.length < 4) {
      alert("Nama channel minimal 4 huruf!");
      return false;
    }

    if (!subscriptionPrice) {
      alert("Harga berlangganan wajib disi!");
      return false;
    }

    return true;
  };

  const handleCreateChannelSubmit = async (e: any) => {
    e.preventDefault();
    const { channelName, subscriptionPrice } = e.target;

    const inputValid = validateCreateChannelInput(
      channelName.value,
      subscriptionPrice.value
    );

    if (inputValid) {
      const token: any = jsCookie.get("token");
      const user: any = jwtDecode(token);
      const data = {
        userID: user.id,
        channelName: channelName.value,
        subscriptionPrice: Number(subscriptionPrice.value),
      };

      const channelRes = await createChannel(data);

      if (channelRes) {
        if (channelRes.token) {
          const newUserData = {
            ...user,
            has_channel: true,
          };
          const updatedData = await updateUserData(newUserData);

          if (updatedData) {
            jsCookie.set("token", updatedData.token);
            jsCookie.set("token_channel", channelRes.token);
            Router.reload();
          } else {
            alert(WARNING_MSG.TRY_AGAIN);
          }
        }
      } else {
        alert("Channel with similar name exists!");
      }
    }
  };

  return (
    <div className={styles.create__channel}>
      <div className={styles.title}>
        Oops, kamu belum punya channel, buat yuk untuk subscribermu{" "}
        <FaRegGrinWink />{" "}
      </div>
      <form onSubmit={handleCreateChannelSubmit} className={styles.form}>
        <div className={styles["form__input--wrap"]}>
          <label htmlFor="channelName">Nama Channel* : </label>
          <input
            type="text"
            name="channelName"
            id="channelName"
            placeholder="Channel ..."
          />
        </div>

        <div className={styles["form__input--wrap"]}>
          <label htmlFor="subscriptionPrice">Harga Berlangganan** :</label>
          <input
            type="number"
            name="subscriptionPrice"
            id="subscriptionPrice"
            placeholder="Rp ..."
          />
        </div>

        <div className={styles.notes}>
          *Nama channel akan menjadi nama URL kontenmu, cth channel &lsquo;ibu
          budi&lsquo; akan mempunyai url {BASE_URL}/channel/ibu-budi{" "}
        </div>
        <div className={styles.notes}>
          ** Harga berlanganan adalah harga berlangganan subscribermu selama 1
          bulan{" "}
        </div>

        <button type="submit">Buat sekarang</button>
      </form>
    </div>
  );
};

export default CreateChannelForm;
