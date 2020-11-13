import React from 'react';
import styles from './Navigation.module.scss';

// @TODO: inject routes regardless of their names (/quests, /about, etc.)
export default function Navigation() {
  return (
    <nav className={styles.main}>
      <ul className={styles.list}>
        <li className=""><a href="/quests">Квесты</a></li>
        <li className=""><a href="/about">О проекте</a></li>
        <li className={styles.active}><a href="/faq">FAQ</a></li>
        <li className=""><a href="/contacts">Контакты</a></li>
      </ul>
    </nav>
  );
}
