
import React, { useState } from "react";
import Image from "next/image";
import { FaFileUpload } from "react-icons/fa";
import styles from "./ContentFileUpload.module.scss";

interface IContentFileUpload {
  placeHolder: string;
  name: string;
}

const ContentFileUpload = (props: IContentFileUpload) => {
  const { placeHolder, name } = props;
  const [fileName, setFileName] = useState("");

  const handleOnChange = (e: any) => {
    const eventFileName = e.target.files[0].name;
    setFileName(eventFileName);
    return "";
  };

  return (
    <div className={styles.file__input}>
      <label htmlFor={name}>
        <FaFileUpload /> {placeHolder}
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
