import jsCookie from 'js-cookie';

const logoutUser = () => {
  jsCookie.remove('token');
  jsCookie.remove('token_channel');
  window.location.href = '/account/login/';
}

export default logoutUser;