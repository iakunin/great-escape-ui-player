import React, {FormEventHandler} from 'react';
import styles from './Form.module.scss';

export default function Form(props: {
  onSubmit?: FormEventHandler;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <form className={styles.form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}
