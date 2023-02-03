import React, { useState } from "react";
import Router from "next/router";
import { FaUpload, FaArrowCircleLeft } from "react-icons/fa";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import getFirebaseStorageRef from "../../../../lib/getFirebaseStorageRef";
import createPost from "../../../../lib/postHandler/createPost";
import textToHtml from "../../../../lib/textToHtml";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import ContentFileUpload from "../ContentFileUpload";
import styles from "./UploadPostForm.module.scss";

interface IUploadPostForm {
  onBackBtnClick: () => void;
}

const UploadPostForm = (props: IUploadPostForm) => {
  const { onBackBtnClick } = props;

  const [uploadPercent, setUploadPercent] = useState(0);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [formError, setFormError] = useState("");

  const validateInput = (e: any) => {
    const caption = e.target.caption.value;
    const post = e.target.new_post.files[0];

    if (caption && caption.length > 500) {
      setFormError("Caption Maksimum 500 karakter");
      return false;
    }

    if (!post) {
      setFormError("File belum di upload!");
      return false;
    }

    const maxAllowedSize = 50 * 1024 * 1024; //50 MB
    if (post && post.size > maxAllowedSize) {
      setFormError("Maximum file size is 50MB");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const caption = e.target.caption.value;
    const post = e.target.new_post.files[0];
    const free_post = e.target.free_post.value === "Free";

    const inputValid = validateInput(e);
    setHasSubmit(inputValid);

    if (inputValid) {
      const channelToken: any = jsCookie.get("token_channel");
      const channel: any = jwtDecode(channelToken);

      const storageRef: any = await getFirebaseStorageRef(
        `/${channel.slug}/${post.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, post);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadPercent(progress);
        },
        (error: any) => {
          console.error(error);
          setHasSubmit(false);
          alert(WARNING_MSG.TRY_AGAIN);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const payload = {
              channelID: channel.id,
              channelSlug: channel.slug,
              downloadURL: downloadURL,
              description: textToHtml(caption),
              postType: post.type.includes("video") ? "Video" : "Image",
              isFree: free_post,
            };

            const postResponse = await createPost(payload);

            if (postResponse.error) {
              alert(WARNING_MSG.TRY_AGAIN);
              setHasSubmit(false);
            }

            if (postResponse && postResponse.id) {
              Router.reload();
            }
          });
        }
      );
    }
  };

  return (
    <div className={styles.upload__post}>
      <h3 className={styles.title}>Upload Kontenmu</h3>
      <form onSubmit={handleSubmit}>
        <ContentFileUpload placeHolder="Upload Gambar/Video" name="new_post"/>

        <div className={styles.form__field__drop}>
          <label htmlFor="free_post">Post Type: </label>
          <select name="free_post" id="free_post" defaultValue="paid">
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
          </select>
        </div>

        <div>
          *Dengan memilih &quot;Post Type&quot; sebagai &quot;Free&quot;,
          pengguna Kontenku dapat melihat konten Anda
          <b> tanpa</b> berlangganan channel Anda.
        </div>

        {formError && <div className={styles.form__error}>{formError}</div>}
        <button type="submit" className={styles.cta} disabled={hasSubmit}>
          {hasSubmit ? (
            <span>Uploading ...{uploadPercent}%</span>
          ) : (
            <span>
              Upload <FaUpload />{" "}
            </span>
          )}
        </button>
      </form>

      <button
        type="button"
        className={styles.back__btn}
        onClick={onBackBtnClick}
      >
        <FaArrowCircleLeft />
      </button>
    </div>
  );
};

export default UploadPostForm;
