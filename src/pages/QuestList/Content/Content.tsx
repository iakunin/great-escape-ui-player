import React from 'react';
import styles from './Content.module.scss'
import {Quest as QuestModel} from "../../../models/Quest";
import {usePromiseTracker} from "react-promise-tracker";
import {Areas} from "../../../enums";
import loadingIcon from "./images/loading.png";
import Sorting from "./Sorting";
import Quest from "./Quest";
import notFoundIcon from "./images/notfound.png";

export default function Content(props: {
  quests: Array<QuestModel>;
}) {
  const {promiseInProgress} = usePromiseTracker({area: Areas.QuestList, delay: 100});

  return promiseInProgress
    ? (
      <div className={styles.info}>
        <img src={loadingIcon} alt="loading"/>
        <span>Мы подбираем квесты: пожалуйста, подождите</span>
      </div>
    ) : (
      props.quests.length !== 0
        ? (
          <>
            <Sorting/>
            <div className={styles.quests}>
              {props.quests.map((quest, idx) =>
                <Quest key={idx} quest={quest}/>
              )}
            </div>
          </>
        ) : (
          <div className={styles.info}>
            <img src={notFoundIcon} alt="not found"/>
            <span>К сожалению, мы не смогли найти квест под Ваш запрос</span>
          </div>
        )
    );
}
