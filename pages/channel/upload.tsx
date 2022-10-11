import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { initializeApp } from "firebase/app";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import fetcher from "../../lib/fetcher";
import textToHtml from "../../lib/textToHtml";
import createPostData from "../../lib/postHandler/createPostData";
import { WARNING_MSG } from "../../lib/warning-messages";
import styles from "./ChannelUpload.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const ChannelUpload = (props: any) => {
  const { channel, firebaseConfig } = props;

  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const description = e.target.description.value;
    const file = e.target.fileUpload?.files[0];
    if (!file) return;

    if (description.length > 250) {
      alert("Maximum description is 250 character");
      return "";
    }

    const maxAllowedSize = 50 * 1024 * 1024; //50 MB
    if (file.size > maxAllowedSize) {
      alert("Maximum file size is 50MB");
      return "";
    }

    const firebaseApp = initializeApp(firebaseConfig);
    const firebaseStorage = getStorage(firebaseApp);
    const storageRef = ref(firebaseStorage, `${channel.slug}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(WARNING_MSG.TRY_AGAIN);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const payload = {
            channelID: channel.id,
            channelSlug: channel.slug,
            downloadURL: downloadURL,
            description: textToHtml(description),
            postType: file.type.includes("video") ? "Video" : "Image",
          };
          await createPostData(payload);
        });
      }
    );
  };

  return (
    <div className="container">
      <div className={styles.channel__upload}>
        <h3 className={styles.title}>Upload Image / Video</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form__field}>
            <label htmlFor="description">Short caption: </label>
            <textarea
              name="description"
              id="description"
              rows={10}
              placeholder="About..."
            />
          </div>

          <div className={styles.form__field}>
            <label htmlFor="file" className={styles.file__label}>
              <input type="file" name="fileUpload" accept="video/*, image/*" />
            </label>
          </div>

          <button type="submit" className={styles.cta}>
            {progresspercent > 0 && progresspercent < 100 ? (
              <span>Uploading...{progresspercent} %</span>
            ) : (
              <span>
                Upload <FaUpload />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies["token"];
  const tokenChannel = context.req.cookies["token_channel"];
  let profile;
  let channel;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (!tokenChannel) {
    return {
      redirect: {
        destination: "/account/",
        permanent: false,
      },
    };
  }

  if (tokenChannel) channel = jwtDecode(tokenChannel);

  const firebaseConfig: any = await fetcher(
    `${BASE_URL}/api/firebase-config/`,
    { method: "GET" }
  );

  return {
    props: {
      channel: channel ?? null,
      firebaseConfig: firebaseConfig?.data ?? {},
    },
  };
};

export default ChannelUpload;
