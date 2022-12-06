import React from 'react';
import Select from 'react-select';
import { VIRTUAL_ACCOUNT_PARTNERS } from '../../../../lib/constants/vaPartners';
import styles from './DropdownVA.module.scss';

interface IDropdownVA {
  onSelectChange: (option: any) => void;
}

const DropdownVA = (props: IDropdownVA) => {
  const { onSelectChange } = props;

  const createVAoptions = () => {
    return VIRTUAL_ACCOUNT_PARTNERS.map((va: any) => {
      return {
        label: <div className={styles.va__options} key={va.value}>
          <span><img src={`/images/partners/${va.value.toLowerCase()}.png`} alt={va.value} /></span>
          <span>{va.label}</span>
        </div>,
        value: va.value
      }
    })
  }

  return (
    <div className={styles.dropdown__va}>
      <div className={styles.title}>Pilih Bank Pembayaran (Virtual Account): </div>
      <Select
        id='bankName'
        instanceId="bankName"
        options={createVAoptions()}
        onChange={onSelectChange}
      />
    </div>
  )
}

export default DropdownVA;