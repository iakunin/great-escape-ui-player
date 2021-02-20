import React from 'react';
import styles from './Footer.module.scss';
import SocialButtons from 'components/SocialButtons';
import appConfig from 'config/appConfig';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.main}>
      <div className={styles.copyright}>© 2021, Great Escape</div>
      <div className={styles.support}>
        Ответим на любые вопросы (c 9:00 до 22:00) — <a href={`tel:${appConfig.phone.normalized}`}>
          {appConfig.phone.pretty}
        </a>
      </div>
      <div className={styles.socialButtons}>
        <SocialButtons/>
      </div>
    </footer>
  );
}
