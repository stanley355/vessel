const setOrderExpiryDate = (order: any) => {
  if (order.merchant) {
    return new Date(order.expired_at).toLocaleString();
  } else {
    const startDate = new Date(order.created_at);

    // seconds * minutes * hours * milliseconds = 1 day
    const day = 60 * 60 * 24 * 1000;

    const endDate = new Date(startDate.getTime() + day);
    return endDate.toLocaleString();
  }
};

export default setOrderExpiryDate;
