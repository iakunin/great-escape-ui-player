import React, {useEffect, useState} from 'react';
import styles from './Content.module.scss';
import {QuestList} from 'models/Quest';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';
import {Areas} from 'enums/Areas';
import loadingIcon from './images/loading.png';
import Sorting from './Sorting';
import notFoundIcon from './images/notfound.png';
import {getQuestList, Request, Sort} from 'api/getQuestList';
import Quest from './Quest';
import {
  createEnumParam,
  NumberParam,
  ObjectParam,
  withDefault,
  withQueryParams
} from 'use-query-params';
import {QuestType} from 'enums/QuestType';
import {FearLevel} from 'enums/FearLevel';

function Content(props: { query: Request }): JSX.Element {

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
      <>
        <Sorting/>
        <div className={styles.info}>
          <img src={loadingIcon} alt="loading"/>
          <span>Мы подбираем квесты: пожалуйста, подождите</span>
        </div>
      </>
    );
  }

  if (questList.length === 0) {
    return (
      <>
        <Sorting/>
        <div className={styles.info}>
          <img src={notFoundIcon} alt="not found"/>
          <span>К сожалению, мы не смогли найти квест под Ваш запрос</span>
        </div>
      </>
    );
  }

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

export default withQueryParams({
  fearLevel: createEnumParam<FearLevel>(Object.values(FearLevel)),
  type: createEnumParam<QuestType>(Object.values(QuestType)),
  minPrice: NumberParam,
  sort: withDefault<Sort | null | undefined, Sort | null | undefined>(
    ObjectParam,
    {},
    false
  ),
}, Content);
