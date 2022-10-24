const checkSubscriptionStatus = (subscription: any) => {
  if (subscription.paid) {
    const date = new Date().getTime();
    const expDate = new Date(subscription.expired_at).getTime();

    return date > expDate ? "PAID" : "EXPIRED";
  } else {
    return "UNPAID";
  }
}

export default checkSubscriptionStatus;
