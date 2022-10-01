import { NextApiRequest, NextApiResponse } from "next";

const firebaseConfig = (req: NextApiRequest, res: NextApiResponse) => {
  
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(config);
};

export default firebaseConfig;