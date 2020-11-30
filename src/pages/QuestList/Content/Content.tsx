import React from 'react';
import styles from './Content.module.scss'
import loadingIcon from "./images/loading.png";
import notFoundIcon from "./images/notfound.png";
import {Quest as QuestModel} from "../../../models/Quest";
import Quest from "../Quest";
import Sorting from "../Sorting";

export enum Status {
  Loading,
  Found,
  NotFound,
}

export default function Content(props: {
  quests: Array<QuestModel>;
  status: Status;
}) {

  return (
    <div className={styles.main}>

      {props.status === Status.Found &&
      <>
        <Sorting/>

        <div className={styles.quests}>
          {props.quests.map((quest, idx) =>
            <Quest key={idx} quest={quest}/>
          )}
        </div>
      </>}

      {props.status === Status.Loading &&
      <div className={styles.info}>
        <img src={loadingIcon} alt="loading"/>
        <span>Мы подбираем квесты: пожалуйста, подождите</span>
      </div>}

      {props.status === Status.NotFound &&
      <div className={styles.info}>
        <img src={notFoundIcon} alt="not found"/>
        <span>К сожалению, мы не смогли найти квест под Ваш запрос</span>
      </div>}

    </div>
  );
}
