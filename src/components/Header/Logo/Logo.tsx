import React from 'react';
import SocialButtons from 'components/SocialButtons';
import styles from './Logo.module.scss';
import {sample} from 'lodash';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {Routes} from 'enums/Routes';

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

function Logo(props: RouteComponentProps): JSX.Element {
  return (
    <div className={styles.main}>
      <div
        className={styles.image}
        onClick={(): void => props.history.push(Routes.Home)}
      />
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

export default withRouter(Logo);
