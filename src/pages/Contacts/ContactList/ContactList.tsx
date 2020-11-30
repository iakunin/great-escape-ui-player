import React from 'react';
import styles from './ContactList.module.scss';

// @TODO: extract phone to settings
const phone: string = '+7 (929) 605-14-50';
const phoneNormalized: string = '+79296051450';

export default function ContactList() {
  return (
    <div className={styles.main}>
      <ul className={styles.list}>
        <li>
          Общие вопросы: <a href="mailto:info@great-escape.ru">info@great&#8209;escape.ru</a>
        </li>
        <li>
          По вопросам сотрудничества: <a href="mailto:partners@great-escape.ru">partners@great&#8209;escape.ru</a>
        </li>
        <li>
          Жалобы и предложения: <a href="mailto:quality@great-escape.ru">quality@great&#8209;escape.ru</a>
        </li>
        <li>Телефон: <a href={`tel:${phoneNormalized}`}>{phone}</a></li>
      </ul>
    </div>
  );
}
