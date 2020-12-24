import React from 'react';
import styles from './SocialButtons.module.scss';
import appConfig from 'config/appConfig';

export default function SocialButtons(): JSX.Element {
  return (
    <div className={styles.main}>
      <ul>
        <li>
          <a
            href={appConfig.socialLinks.vk}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.vk}/>
          </a>
        </li>
        <li>
          <a
            href={appConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.instagram}/>
          </a>
        </li>
        <li>
          <a
            href={appConfig.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.facebook}/>
          </a>
        </li>
      </ul>
    </div>
  );
}
