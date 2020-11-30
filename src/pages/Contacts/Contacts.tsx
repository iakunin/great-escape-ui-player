import React from 'react';
import styles from './Contacts.module.scss';
import FeedbackForm from "./FeedbackForm";
import ContactList from "./ContactList";

export default function Contacts() {
  return (
    <div className={styles.main}>
      <h1>Контакты и обратная связь</h1>
      <ContactList/>
      <FeedbackForm/>
    </div>
  );
}
