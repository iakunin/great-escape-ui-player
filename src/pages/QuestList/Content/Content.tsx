import React, {useEffect, useState} from 'react';
import styles from './Content.module.scss';
import {QuestList} from 'models/Quest';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';
import {Areas} from 'enums/Areas';
import loadingIcon from './images/loading.png';
import notFoundIcon from './images/notfound.png';
import {getQuestList} from 'api/getQuestList';
import Quest from './Quest';
import {withQueryParams} from 'use-query-params';
import {questListConfigMap, QuestListProps} from 'state/questList';

function Content(props: QuestListProps): JSX.Element {

  const {promiseInProgress} = usePromiseTracker({area: Areas.QuestList, delay: 100});

  const {query} = props;

  const [questList, setQuestList] = useState<QuestList | undefined>(undefined);

  useEffect(() => {
    trackPromise(
      getQuestList(query)
        .then(questList => {
          setQuestList(questList);
        }),
      Areas.QuestList
    );
  }, [setQuestList, query]);

  if (promiseInProgress || questList === undefined) {
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

  return (
    <div className={styles.quests}>
      {questList.map((quest, idx) =>
        <Quest key={idx} quest={quest}/>
      )}
    </div>
  );
}

export default withQueryParams(questListConfigMap, Content);
