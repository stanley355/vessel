const validateCreateChannelInput = (e: any) => {
  const { channelName, subscriptionPrice } = e.target;

  if (!channelName.value) {
    alert("Nama channel wajib diisi!");
    return false;
  }

  if (!subscriptionPrice.value) {
    alert("Harga berlangganan wajib disi!");
    return false;
  }

  return true;
};

export default validateCreateChannelInput;
