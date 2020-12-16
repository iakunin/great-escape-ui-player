import React from 'react';
import styles from './SocialButtons.module.scss';

export default function SocialButtons(): JSX.Element {
  return (
    <div className={styles.main}>
      <ul>
        <li>
          <a
            href="https://vk.com/greatescape_project"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.vk}/>
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/greatescape_project"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.instagram}/>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/Great-Escape-Project-844307092273179"
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
