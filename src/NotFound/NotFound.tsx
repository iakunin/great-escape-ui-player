import React from 'react';
import image from './notfound.png'
import styles from './NotFound.module.scss'
import {Link} from "react-router-dom";
import {Routes} from "../App/Routes";

// @TODO: extract me to some config
const email: string = 'info@great-escape.ru';

export default function NotFound() {
  return (
    <div className={styles.main}>
      <img src={image} alt=""/>
      <div className={styles.text}>
        Упс, нам очень жаль.<br/>
        Вы попытались открыть несуществующую страницу.<br/>
        Попробуйте <Link to={Routes.Home}>начать с начала</Link>.<br/>
        Или <a href={"mailto:" + email}>напишите нам</a>, если проблема повторяется регулярно.
      </div>
    </div>
  );
}
