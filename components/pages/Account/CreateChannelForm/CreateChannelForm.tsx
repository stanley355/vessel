import React from 'react';
import getConfig from 'next/config';
import { FaRegGrinWink } from 'react-icons/fa';
import jsCookie from 'js-cookie';
import createChannel from '../../../../lib/channelHandler/createChannel';
import styles from './CreateChannelForm.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface ICreateChannelForm {
  ownerID: string;
}

const CreateChannelForm = (props: ICreateChannelForm) => {

  const handleSubmit = async (e:any) => {
    
    const data = {
      userID: props.ownerID,
      channelName: e.target.channelName.value,
      subscriptionPrice: e.target.subscriptionPrice.value
    }

    const channelRes = await createChannel(data);
  }

  return (
    <div className={styles.create__channel}>
      <div className={styles.title}>Oops, kamu belum punya channel, buat yuk untuk subscribermu <FaRegGrinWink /> </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['form__input--wrap']}>
          <label htmlFor="channelName">Nama Channel* : </label>
          <input type="text" name="channelName" id="channelName" placeholder='Channel ...' />
        </div>

        <div className={styles['form__input--wrap']}>
          <label htmlFor="subscriptionPrice">Harga Berlangganan** :</label>
          <input type="number" name="subscriptionPrice" id="subscriptionPrice" placeholder='Rp ...' />
        </div>

        <div className={styles.notes}>*Nama channel akan menjadi nama URL kontenmu, cth channel 'ibu budi' akan mempunyai url {BASE_URL}/channel/ibu-budi  </div>
        <div className={styles.notes}>** Harga berlanganan adalah harga berlangganan subscribermu selama 1 bulan </div>

        <button type="submit">Buat sekarang</button>
      </form>
    </div>
  )
}

export default CreateChannelForm;