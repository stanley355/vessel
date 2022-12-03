import React from 'react';
import styles from './AdminLoginForm.module.scss';

const AdminLoginForm = () => {

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const {email, password} = e.target;
    console.log(email.value);
  }

  return (
    <div className={styles.login__form}>
      <h3>R u Admin ?</h3>
      <form onSubmit={handleSubmit}> 
        <input type="text" placeholder='Admin Email' name='email' />
        <input type="passowrd" placeholder='password' name='password'/>
        <button type="submit">Submit?</button>
      </form>
    </div>
  )
}

export default AdminLoginForm;