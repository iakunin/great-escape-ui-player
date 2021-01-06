import React from 'react';
import styles from 'components/Form/common.module.scss';
import InputMask from 'react-input-mask';

export default function PhoneValidated(props: {
  mask: string;
  placeholder?: string;
  name?: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}): JSX.Element {
  return (
    <div className={styles.fieldGroup}>
      <InputMask
        className={styles.input} type="tel" mask={props.mask} name={props.name}
        placeholder={props.placeholder} inputRef={props.inputRef}
      />

      {
        props.error &&
        <div className={styles.error}>{props.error}</div>
      }
    </div>
  );
}
