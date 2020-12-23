import React from 'react';
import styles from './ContactList.module.scss';
import appConfig from 'config/appConfig';

export default function ContactList(): JSX.Element {
  return (
    <div className={styles.main}>
      <ul className={styles.list}>
        <li>
          Общие вопросы: <a href={`mailto:${appConfig.email.info}`}>{appConfig.email.info}</a>
        </li>
        <li>
          По вопросам сотрудничества: <a href={`mailto:${appConfig.email.partners}`}>{appConfig.email.partners}</a>
        </li>
        <li>
          Жалобы и предложения: <a href={`mailto:${appConfig.email.quality}`}>{appConfig.email.quality}</a>
        </li>
        <li>
          Телефон: <a href={`tel:${appConfig.phoneNormalized}`}>{appConfig.phone}</a>
        </li>
      </ul>
    </div>
  );
}
