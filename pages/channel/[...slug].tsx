import React, { useState } from 'react';
import getConfig from 'next/config';
import jwtDecode from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import fetcher from '../../lib/fetcher';

const { BASE_URL } = getConfig().publicRuntimeConfig;

const ChannelSlug = (props: any) => {
  const { token, tokenChannel, firebaseConfig } = props;

  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseStorage = getStorage(firebaseApp);

  const [imgUrl, setImgUrl] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
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
      <form onSubmit={handleSubmit} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies['token'];
  const tokenChannel = context.req.cookies['token_channel'];
  let profile;
  let channel;

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

export default ChannelSlug;