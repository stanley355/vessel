import jsCookie from 'js-cookie';

const logoutUser = () => {
  jsCookie.remove('token');
  window.location.href = '/account/login/';
}

export default logoutUser;