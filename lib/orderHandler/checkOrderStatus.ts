import isOrderExpired from "./isOrderExpired";

const checkOrderStatus = (subs: any) => {
  const isExpired = isOrderExpired(subs);

  return isExpired ? "EXPIRED" : subs.status;
};

export default checkOrderStatus;
