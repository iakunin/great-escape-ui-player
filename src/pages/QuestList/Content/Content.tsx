import React, {useEffect, useState} from 'react';
import styles from './Content.module.scss'
import {QuestList} from "../../../models/Quest";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {Areas} from "../../../enums";
import loadingIcon from "./images/loading.png";
import Sorting from "./Sorting";
import Quest from "./Quest";
import notFoundIcon from "./images/notfound.png";
import {connect, ConnectedProps} from "react-redux";
import {getQuestList} from "../../../api/getQuestList";
import {RootState} from "../../../config/store";

const connector = connect(
  (state: RootState) => ({
    request: state.questListRequest
  })
)

function Content(props: ConnectedProps<typeof connector>): JSX.Element {

  const {promiseInProgress} = usePromiseTracker({area: Areas.QuestList, delay: 100});

  const {request} = props;

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

  if (promiseInProgress) {
    return (
      <div className={styles.info}>
        <img src={loadingIcon} alt="loading"/>
        <span>Мы подбираем квесты: пожалуйста, подождите</span>
      </div>
    );
  }

  if (questList.length === 0) {
    return (
      <div className={styles.info}>
        <img src={notFoundIcon} alt="not found"/>
        <span>К сожалению, мы не смогли найти квест под Ваш запрос</span>
      </div>
    );
  }

  // @TODO: add infinite scroll
  return (
    <>
      <Sorting/>
      <div className={styles.quests}>
        {questList.map((quest, idx) =>
          <Quest key={idx} quest={quest}/>
        )}
      </div>
    </>
  );
}

export default connector(Content);
