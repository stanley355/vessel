import React, { useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import jwtDecode from 'jwt-decode';
import { WARNING_MSG } from '../../../lib/warning-messages';
import getFirebaseStorageRef from '../../../lib/getFirebaseStorageRef';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateChannelData } from '../../../lib/channelHandler/updateChannelData';
import styles from './setting.module.scss';

const ChannelSetting = (props: any) => {
  const { profile, channel } = props;

  const [formError, setFormError] = useState("");
  const [hasSubmit, setHasSubmit] = useState(false);

  const validateInput = (e: any) => {
    const channelName = e.target.newChannelName.value.trim();
    const channelPrice = e.target.newSubscriptionPrice.value;

    if (channelName) {
      if (channelName.length < 4) {
        setFormError("Nama Channel Minimal 4 huruf!");
        return false;
      }

      if (/\s/g.test(channelName)) {
        setFormError("Nama Channel tidak boleh ada spasi");
        return false;
      }

      if (/[A-Z]/.test(channelName)) {
        setFormError("Nama Channel tidak boleh ada huruf besar");
        return false;
      }
    }

    if (channelPrice && channelPrice < 10000) {
      setFormError("Harga Berlangganan Channel minimal Rp10.000 / bulan!");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleChannelUpdateRes = async (payload: any) => {
    const channelUpdateRes = await updateChannelData(payload);

    if (channelUpdateRes) {
      if (channelUpdateRes.error) {
        if (channelUpdateRes.data && channelUpdateRes.data.error) {
          setFormError(channelUpdateRes.data.error);
        } else {
          setFormError(WARNING_MSG.TRY_AGAIN);
        }

        setHasSubmit(false);
        return ""
      } else {
        Router.push("/account/")
      }
    } else {
      setFormError(WARNING_MSG.TRY_AGAIN);
      setHasSubmit(false);
      return ""
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const inputValid = validateInput(e);
    setHasSubmit(inputValid);

    if (inputValid) {
      const newChannelName = e.target.newChannelName.value.trim();
      const newChannelPrice = e.target.newSubscriptionPrice.value;
      const newProfileImage = e.target.profileImg.files[0];

      if (newProfileImage) {
        const storageRef: any = await getFirebaseStorageRef(
          `/profileImage/${newChannelName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, newProfileImage);

        uploadTask.on(
          "state_changed",
          (snapshot: any) => { },
          (error: any) => {
            console.error(error);
            setHasSubmit(false);
            alert(WARNING_MSG.TRY_AGAIN);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              const payload = {
                channelID: channel.id,
                ...(newChannelName && { channelName: newChannelName }),
                ...(newChannelPrice && { subscriptionPrice: newChannelPrice }),
                profileImgUrl: downloadURL
              }
              await handleChannelUpdateRes(payload);
            });
          }
        );
      } else {
        const payload = {
          channelID: channel.id,
          ...(newChannelName && { channelName: newChannelName }),
          ...(newChannelPrice && { subscriptionPrice: newChannelPrice })
        }
        await handleChannelUpdateRes(payload);
      }
    }
  }

  return (
    <div className="container">
      <div className={styles.setting}>
        <h3>Update Channel Setting</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.img_wrap}>
            <img src={channel.profile_img_url} alt={channel.channel_name} />
          </div>

          <div className={styles.field}>
            <label htmlFor="newChannelName">
              Current Channel Name: {channel.channel_name}
            </label>
            <input type="text" placeholder='Insert here for new Channel Name' name='newChannelName' />
          </div>

          <div className={styles.field}>
            <label htmlFor="newSubscriptionPrice">
              Current Subscription Price: {channel.subscription_price}
            </label>
            <input type="number" placeholder='Insert here for new Channel Name' name='newSubscriptionPrice' />
          </div>

          <div className={styles.field}>
            <label htmlFor="profileImg">New Profile Image</label>
            <input
              type="file"
              name='profileImg'
              accept="image/*"
            />
          </div>

          <span>*Pastikan data Anda sudah benar sebelum mensubmit</span>

          <button type="submit" disabled={hasSubmit}>{hasSubmit ? "Loading..." : "Submit"}</button>

          {formError && <div className={styles.error}>{formError}</div>}
        </form>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies["token"];
  const token_channel = context.req.cookies["token_channel"];

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (!token_channel) {
    return {
      redirect: {
        destination: "/account/",
        permanent: false,
      },
    };
  }

  const profile: any = token ? jwtDecode(token) : "";
  const channel: any = token_channel ? jwtDecode(token_channel) : "";

  return {
    props: {
      profile,
      channel,
    },
  };
};


export default ChannelSetting;