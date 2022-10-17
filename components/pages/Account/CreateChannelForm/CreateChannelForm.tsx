import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import styles from './CreateChannelForm.module.scss';

const CreateChannelForm = () => {

  return (
    <div className={styles.create__channel}>
      <div className={styles.title}>Create Channel</div>
      <form action="">
        <div className={styles.field}>
          <label htmlFor="channel_name">Nama Channel: </label>
          <input
            type="text"
            name="channel_name"
            id="channel_name"
            placeholder='abcde'
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="channel_name">Harga Berlangganan (bulan): </label>
          <CurrencyInput
            prefix='Rp'
            id="channel_price"
            name="channel_price"
            placeholder="Rp1,000"
            decimalsLimit={2}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="profile_img">Upload Profile Image: </label>
          <input type="file" name="profile_img" id="profile_img" />
        </div>

        <button type="submit" className={styles.cta}>
          Buat Channel
        </button>
      </form>
    </div>
  )
}

export default CreateChannelForm;