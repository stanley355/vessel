export const calculateStorageSnapshot = (snapshot: any) => {
  return Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
};
