import setOrderExpiryDate from "./setOrderExpiryDate";

const isOrderExpired = (order: any) => {
  const exp = setOrderExpiryDate(order);
  const expDate = new Date(exp);

  const currentDate = new Date();

  return currentDate.getTime() > expDate.getTime();
};

export default isOrderExpired;