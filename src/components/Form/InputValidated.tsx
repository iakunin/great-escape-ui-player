import React from 'react';
import styles from 'components/Form/common.module.scss';

export default function InputValidated(props: {
  placeholder?: string;
  name?: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  return (
    <div className={styles.fieldGroup}>
      <input className={styles.input} placeholder={props.placeholder} onChange={props.onChange}
             name={props.name} ref={props.inputRef} autoComplete={props.autoComplete}
             type={props.type}
      />

      {
        props.error &&
        <div className={styles.error}>{props.error}</div>
      }
    </div>
  );
}
