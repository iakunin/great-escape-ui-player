import React, {useEffect, useState} from 'react';
import styles from './Content.module.scss'
import {QuestList} from "../../../models/Quest";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {Areas} from "../../../enums";
import loadingIcon from "./images/loading.png";
import Sorting from "./Sorting";
import Quest from "./Quest";
import notFoundIcon from "./images/notfound.png";
import {useSelector} from "react-redux";
import {selectQuestListRequest} from "../../../redux/questListRequest.slice";
import {getQuestList} from "../../../api/getQuestList";

export default function Content() {
  const {promiseInProgress} = usePromiseTracker({area: Areas.QuestList, delay: 100});

  const request = useSelector(selectQuestListRequest)

  const [questList, setQuestList] = useState<QuestList>([]);

  useEffect(() => {
    trackPromise(
      getQuestList(request)
        .then((questList: QuestList) => {
          setQuestList(questList)
        }),
      Areas.QuestList
    )
  }, [setQuestList, request]);

  // @TODO: add infinite scroll
  return promiseInProgress
    ? (
      <div className={styles.info}>
        <img src={loadingIcon} alt="loading"/>
        <span>Мы подбираем квесты: пожалуйста, подождите</span>
      </div>
    ) : (
      questList.length !== 0
        ? (
          <>
            <Sorting/>
            <div className={styles.quests}>
              {questList.map((quest, idx) =>
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
