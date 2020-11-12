import React from 'react';
import styles from './Footer.module.scss';
import SocialButtons from "../SocialButtons";

export default function Footer() {
  return (
    <footer className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.copyright}>© 2020, Great&nbsp;Escape</div>
        <div className={styles.support}>Ответим на любые вопросы —
          <a href="mailto:info@great-escape.ru">info@great&#8209;escape.ru</a>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <SocialButtons/>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
