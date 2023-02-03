import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import styles from "./ContentFileUpload.module.scss";

interface IContentFileUpload {
  placeHolder: string;
  name: string;
}

const ContentFileUpload = (props: IContentFileUpload) => {
  const { placeHolder, name } = props;

  const [fileName, setFileName] = useState("");

  const handleOnChange = async (e: any) => {
    const uploadedFile = e.target.files[0];

    const maxAllowedSize = 100 * 1024 * 1024; //100 MB
    if (uploadedFile.size > maxAllowedSize) {
      alert("Maximum File Size 100MB");
      return "";
    }

    setFileName(uploadedFile.name);
  };

  return (
    <div className={styles.file__input}>
      <label htmlFor={name}>
        <FaFileUpload />
        <div>{fileName ? fileName : placeHolder}</div>
      </label>
      <input
        type="file"
        name={name}
        id={name}
        accept="image/*, video/*"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default ContentFileUpload;
