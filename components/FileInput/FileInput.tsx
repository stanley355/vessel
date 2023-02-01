import React, { useState } from 'react';
import styles from './FileInput.module.scss';

interface IFileInput {
  placeHolder: string;
  name: string;
  accept: "image" | "video" | "all";
}

const FileInput = (props: IFileInput) => {
  const { placeHolder, name, accept } = props;
  const [fileName, setFileName] = useState('');

  const handleAccept = () => {
    if (accept === "image") return "image/*";
    if (accept === "video") return "video/*";
    return "video/*, image/*";
  }

  const handleOnChange = (e: any) => {
    const eventFileName = e.target.files[0].name;
    setFileName(eventFileName);
    return '';
  }

  return (
    <div className={styles.file__input}>
      <div className={styles.main}>
        <label htmlFor={name}>{placeHolder}</label>
        <input
          type="file"
          name={name}
          id={name}
          accept={handleAccept()}
          onChange={handleOnChange}
        />
      </div>
      <div>{fileName}</div>
    </div>

  )
}

export default FileInput;