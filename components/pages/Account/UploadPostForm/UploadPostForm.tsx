import React from 'react';
import { FaUpload, FaArrowCircleLeft } from 'react-icons/fa';
import styles from './UploadPostForm.module.scss';

interface IUploadPostForm {
  onBackBtnClick: () => void;
}

const UploadPostForm = (props: IUploadPostForm) => {
  const { onBackBtnClick } = props;

  const handleSubmit = (e: any) => {

  }

  return (
    <div className={styles.upload__post}>
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
          Upload <FaUpload />
        </button>
      </form>

      <button type='button' className={styles.back__btn} onClick={onBackBtnClick}>
        <FaArrowCircleLeft />
      </button>
    </div>
  )
}

export default UploadPostForm;