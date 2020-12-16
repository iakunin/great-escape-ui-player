import React from 'react';
import styles from './Footer.module.scss';
import SocialButtons from 'components/SocialButtons';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.copyright}>© 2020, Great&nbsp;Escape</div>
        <div className={styles.support}>Ответим на любые вопросы —
          <a href="mailto:info@great-escape.ru">info@great&#8209;escape.ru</a>
        </div>
        <div className={styles.socialButtons}>
          <SocialButtons/>
        </div>
      </div>
    </footer>
  );
}
