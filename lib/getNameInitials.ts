const getNameInitials = (fullname: string) => {
  const name = fullname.split(" ");
  if (name.length > 1) {
    return name[0][0] + name[1][0];
  }
  return name[0][0];
};

export default getNameInitials;
