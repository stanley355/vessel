import React, { useState } from 'react';
import getConfig from 'next/config';
import jwtDecode from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import fetcher from '../../lib/fetcher';
import styles from './ChannelUpload.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

const ChannelUpload = (props: any) => {
  const { profile, channel, firebaseConfig } = props;

  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseStorage = getStorage(firebaseApp);

  const [imgUrl, setImgUrl] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const file = e.target.file?.files[0];

    if (!file) return;
    const storageRef = ref(firebaseStorage, `files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImgUrl(downloadURL)
        });
      }
    );
  }

  return (
    <div className='container'>
      <div className={styles.channel__upload}>
        <h3 className={styles.title}>Upload Image / Video</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form__field}>
            <label htmlFor="description">Deskripsi: </label>
            <textarea name="description" id="" cols={40} rows={10} defaultValue="" placeholder='Tulis apa yah ...' />
          </div>

          <div className={styles.form__field}>
            <label htmlFor="file" >
              <input type='file' name='file' />
            </label>
          </div>

          <button type='submit' className={styles.cta}>Upload

            {!imgUrl &&
              <div className='outerbar'>
                <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
              </div>}
          </button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies['token'];
  const tokenChannel = context.req.cookies['token_channel'];
  let profile;
  let channel;

  if (!token) {
    return {
      redirect: {
        destination: '/account/login/',
        permanent: false,
      },
    }
  }

  if (!tokenChannel) {
    return {
      redirect: {
        destination: '/account/',
        permanent: false,
      },
    }
  }

  if (token) profile = jwtDecode(token);
  if (tokenChannel) channel = jwtDecode(tokenChannel);

  const firebaseConfig: any = await fetcher(`${BASE_URL}/api/firebase-config/`, { method: "GET" });

  return {
    props: {
      profile: profile ?? null,
      channel: channel ?? null,
      firebaseConfig: firebaseConfig?.data ?? {}
    }
  }
}

export default ChannelUpload;