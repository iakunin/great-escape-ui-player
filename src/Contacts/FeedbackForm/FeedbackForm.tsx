import React from 'react';
import styles from './FeedbackForm.module.scss';

export default function FeedbackForm() {
  return (
    <div className={styles.main}>
      <form className={styles.form}>

        <div>
          <input type="text" placeholder="Имя" name="name"/>
          <div className="message error"/>
        </div>

        <div>
          <input type="text" placeholder="E-mail" name="email"/>
          <div className="message error"/>
        </div>

        <div>
          <textarea rows={6} placeholder="Текст сообщения" name="text"/>
          <div className="message error"/>
        </div>

        <div>
          <input type="submit" value="Отправить" className={styles.button}/>
        </div>

      </form>

    </div>
  );
}
