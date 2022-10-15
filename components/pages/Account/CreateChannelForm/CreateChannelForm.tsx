import React from "react";
import { FaRegGrinWink } from "react-icons/fa";
import getConfig from "next/config";
import Router from "next/router";
import jsCookie from 'js-cookie';
import jwtDecode from "jwt-decode";
import createChannel from "../../../../lib/channelHandler/createChannel";
import updateUserData from "../../../../lib/updateUserData";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import styles from "./CreateChannelForm.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const CreateChannelForm = () => {

  const validateCreateChannelInput = (e: any) => {
    const { channelName, subscriptionPrice } = e.target;
  
    if (!channelName.value) {
      alert("Nama channel wajib diisi!");
      return false;
    }
  
    if (!subscriptionPrice.value) {
      alert("Harga berlangganan wajib disi!");
      return false;
    }
  
    return true;
  };

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
      console.log(222, channelRes);
  
      if (channelRes) {
        if (channelRes.token) {
          const newUserData = {
            ...decode,
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
  
        if (channelRes.error) {
          alert("Channel with similar name exists!");
        }
      } else {
        alert(WARNING_MSG.TRY_AGAIN);
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
