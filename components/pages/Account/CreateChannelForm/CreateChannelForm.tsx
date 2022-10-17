import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import styles from './CreateChannelForm.module.scss';

const CreateChannelForm = () => {

  const [formError, setFormError] = useState('');

  const validateInput = (e: any) => {
    const channelName = e.target.channel_name.value;
    const channelPrice = e.target.channel_price.value;
    const profileImage = e.target.profile_img.files[0];

    if (!channelName) {
      setFormError('Nama Channel Wajib Diisi!');
      return false;
    }

    if (channelName && channelName.length < 4) {
      setFormError('Nama Channel Minimal 4 huruf!');
      return false;
    }

    if (!channelPrice) {
      setFormError('Harga Berlangganan Wajib Diisi!');
      return false;
    }

    if (channelPrice && channelPrice < 2000) {
      setFormError('Harga Berlangganan minimal Rp2000 / bulan!');
      return false;
    }

    if (!profileImage) {
      setFormError('Profile Image belum di upload!');
      return false;
    }

    return true;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputValid = validateInput(e);

  }

  return (
    <div className={styles.create__channel}>
      <div className={styles.title}>Create Channel</div>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="channel_price">Harga Berlangganan (bulan): </label>
          <CurrencyInput
            prefix='Rp'
            id="channel_price"
            name="channel_price"
            placeholder="Rp2,000"
            decimalsLimit={2}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="profile_img">Upload Profile Image: </label>
          <input type="file" name="profile_img" id="profile_img" accept="image/*" />
        </div>

        {formError && <div className={styles.error}>{formError}</div>}

        <button type="submit" className={styles.cta}>
          Buat Channel
        </button>
      </form>
    </div>
  )
}

export default CreateChannelForm;