const generateDokuVApath = (bankName: string) => {
  const initialVApath = () => {
    switch (bankName) {
      case "BCA":
      case "DOKU":
        return "/doku-virtual-account";
      case "MANDIRI":
        return "/mandiri-virtual-account";
      case "BSI":
        return "/bsm-virtual-account";
      case "BRI":
        return "/bri-virtual-account";
      case "CIMB":
        return "/cimb-virtual-account";
      case "PERMATA":
        return "/permata-virtual-account";
      case "BNI":
        return "/bni-virtual-account";
      case "DANAMON":
        return "/danamon-virtual-account";
      default:
        return "/doku-virtual-account";
    }
  };

  return initialVApath() + "/v2/payment-code/";
};

export default generateDokuVApath;
