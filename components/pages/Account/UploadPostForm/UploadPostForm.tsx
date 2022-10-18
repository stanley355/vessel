import React, { useState } from "react";
import { FaUpload, FaArrowCircleLeft } from "react-icons/fa";
import styles from "./UploadPostForm.module.scss";

interface IUploadPostForm {
  onBackBtnClick: () => void;
}

const UploadPostForm = (props: IUploadPostForm) => {
  const { onBackBtnClick } = props;

  const [formError, setFormError] = useState('');

  const validateInput = (e: any) => {
    const caption = e.target.caption.value;
    const post = e.target.new_post.files[0];

    if (caption && caption.length > 250) {
      setFormError("Maximum description is 250 character");
      return "";
    }

    if (!post) {
      setFormError('File belum di upload!');
      return '';
    }

    const maxAllowedSize = 50 * 1024 * 1024; //50 MB
    if (post && post.size > maxAllowedSize) {
      setFormError("Maximum file size is 50MB");
      return "";
    }

    setFormError('');
    return "";
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const caption = e.target.caption.value;
    const post = e.target.new_post.files[0];
    const post_type = e.target.post_type.value;

    const inputValid = validateInput(e);


  };

  return (
    <div className={styles.upload__post}>
      <h3 className={styles.title}>Upload Image / Video</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__field}>
          <label htmlFor="caption">Short caption: </label>
          <textarea
            name="caption"
            id="caption"
            rows={10}
            placeholder="About..."
          />
        </div>

        <div className={styles.form__field}>
          <label htmlFor="new_post" className={styles.file__label}>
            <input type="file" name="new_post" accept="video/*, image/*" />
          </label>
        </div>

        <div className={styles.form__field__drop}>
          <label htmlFor="post_type">Post Type: </label>
          <select name="post_type" id="post_type">
            <option value="Paid" selected>Paid</option>
            <option value="Free" >Free</option>
          </select>
        </div>

        <div>
          *Dengan memilih "Post Type" sebagai "Free", pengguna Kontenku dapat melihat konten Anda
          <b> tanpa</b> berlangganan channel Anda.
        </div>

        {formError && <div className={styles.form__error}>{formError}</div>}
        <button type="submit" className={styles.cta}>
          Upload <FaUpload />
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
