import React from 'react';
import image from './images/notfound.png';
import styles from './NotFound.module.scss';
import {Link} from 'react-router-dom';
import {Routes} from 'enums/Routes';
import appConfig from 'config/appConfig';

export default function NotFound(): JSX.Element {
  return (
    <div className={styles.main}>
      <h1>Упс, нам очень жаль</h1>
      <div className={styles.box}>
        <img src={image} alt=""/>
        <div className={styles.text}>
          Вы попытались открыть несуществующую страницу.<br/>
          Попробуйте <Link to={Routes.Home}>начать с начала</Link>.<br/>
          Или <a href={`mailto:${appConfig.email.info}`}>напишите нам</a>, если проблема повторяется регулярно.
        </div>
      </div>
    </div>
  );
}
