import React from 'react';
import SocialButtons from 'components/SocialButtons';
import styles from './Logo.module.scss';
import {sample} from 'lodash';

export default function Logo(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.image}/>
      <div className={styles.text}>

        <ul>
          <li className={styles.textItem}>
            {sample(texts)}
          </li>
        </ul>

        <div className={styles.socialButtons}>
          <SocialButtons/>
        </div>

      </div>
    </div>
  );
}

const texts: JSX.Element[] = [
    <>
      <span>Мы знаем</span>о квестах все!
    </>,
    <>
      <span>Лучшие</span>квесты Москвы!
    </>,
    <>
      <span>Вступай</span>скорее в клуб!
    </>,
];
