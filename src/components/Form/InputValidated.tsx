import React from 'react';
import styles from 'components/Form/common.module.scss';

export default function InputValidated(props: {
  placeholder?: string;
  name?: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}): JSX.Element {
  return (
    <div className={styles.fieldGroup}>
      <input className={styles.input} placeholder={props.placeholder}
             name={props.name} ref={props.inputRef}
      />

      {
        props.error &&
        <div className={styles.error}>{props.error}</div>
      }
    </div>
  );
}
