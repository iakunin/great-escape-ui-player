import React from 'react';
import styles from './Footer.module.scss';
import SocialButtons from 'components/SocialButtons';
import appConfig from 'config/appConfig';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.copyright}>© 2020, Great&nbsp;Escape</div>
        <div className={styles.support}>Ответим на любые вопросы —
          <a href={`mailto:${appConfig.email.info}`}>{appConfig.email.info}</a>
        </div>
        <div className={styles.socialButtons}>
          <SocialButtons/>
        </div>
      </div>
    </footer>
  );
}
