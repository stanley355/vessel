import React, { useState } from "react";
import Router from "next/router";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import getFirebaseStorageRef from "../../../../lib/getFirebaseStorageRef";
import createPost from "../../../../lib/postHandler/createPost";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import ContentFileUpload from "../ContentFileUpload";
import useResponsive from "../../../../lib/hooks/useResponsive";
import styles from "./UploadPostForm.module.scss";

interface IUploadPostForm {
  onBackBtnClick: () => void;
}

const UploadPostForm = (props: IUploadPostForm) => {
  const { onBackBtnClick } = props;

  const { isDesktop } = useResponsive();

  const [uploadPercent, setUploadPercent] = useState(0);
  const [freePost, setFreePost] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [formError, setFormError] = useState("");

  const validateInput = (e: any) => {
    const title = e.target.title.value;
    const newPost = e.target.new_post.files[0];

    if (title && title.length > 250) {
      setFormError("Judul Maksimum 250 karakter");
      return false;
    }

    if (!newPost) {
      setFormError("Kontenmu lupa diupload!");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSnapshot = (snapshot: any) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setUploadPercent(progress);
  };

  const handleUploadError = (error: any) => {
    console.error(error);
    setHasSubmit(false);
    alert(WARNING_MSG.TRY_AGAIN);
  };

  const handleUploadSuccess = async (
    title: string,
    channel: any,
    newPost: any,
    downloadURL: string
  ) => {
    const payload = {
      channelID: channel.id,
      channelSlug: channel.slug,
      downloadURL: downloadURL,
      description: "-",
      title: title,
      postType: newPost.type.includes("video") ? "Video" : "Image",
      isFree: freePost,
    };

    const postResponse = await createPost(payload);
    if (postResponse.error) {
      alert(WARNING_MSG.TRY_AGAIN);
      setHasSubmit(false);
      return "";
    }

    if (postResponse && postResponse.id) {
      Router.reload();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const newPost = e.target.new_post.files[0];
    const inputValid = validateInput(e);
    setHasSubmit(inputValid);

    if (inputValid) {
      const channelToken: any = jsCookie.get("token_channel");
      const channel: any = jwtDecode(channelToken);
      const storagePath = `/${channel.slug}/${newPost.name}`;
      const storageRef: any = await getFirebaseStorageRef(storagePath);
      const uploadTask = uploadBytesResumable(storageRef, newPost);

      uploadTask.on(
        "state_changed",
        (snapshot) => handleSnapshot(snapshot),
        (error: any) => handleUploadError(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => await handleUploadSuccess(title, channel, newPost, downloadURL)
          );
        }
      );
    }
  };

  return (
    <div className={styles.upload__post}>
      {isDesktop && <div className={styles.hero}>
        <img src="/images/cartoon/write_post.png" alt="Create Post" />
      </div>}
      <div>
        <h3 className={styles.title}>Upload Kontenmu</h3>
        <form onSubmit={handleSubmit}>
          <ContentFileUpload placeHolder="Upload Gambar/Video" name="new_post" />

          <div className={styles.field}>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Tulis Judul keren untuk Kontenmu..."
            />
          </div>

          <div className={styles.field__paid}>
            <button
              type="button"
              className={freePost ? "" : styles.active}
              onClick={() => setFreePost(false)}
            >
              Paid
            </button>
            |
            <button
              type="button"
              className={freePost ? styles.active : ""}
              onClick={() => setFreePost(true)}
            >
              Free
            </button>
          </div>

          <div>
            *Dengan memilih &quot;Free&quot;, pengguna dapat melihat konten Anda
            <b> tanpa</b> berlangganan channel Anda.
          </div>

          {formError && <div className={styles.error}>{formError}</div>}
          <button type="submit" className={styles.cta} disabled={hasSubmit}>
            {hasSubmit ? `Uploading: ${uploadPercent}%` : "Submit"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default UploadPostForm;
