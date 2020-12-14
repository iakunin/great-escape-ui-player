import React, {useEffect, useState} from 'react';
import styles from './Search.module.scss'
import {Quest} from "../../../models";
import {trackPromise} from 'react-promise-tracker';
import {Areas, FearLevel, QuestType} from "../../../enums";
import Criteria from "./Criteria";
import {getQuestList, Request} from "../../../api/getQuestList";

export default function Search(props: {
  onQuestsChange: (quests: Array<Quest>) => void;
}) {

  const [request, setRequest] = useState<Request>({ololo: 1});

  const {onQuestsChange} = props;

  useEffect(() => {
    trackPromise(
      getQuestList(request)
        .then((questList: Array<Quest>) => {
          onQuestsChange(questList)
        }),
      Areas.QuestList
    );
  }, [onQuestsChange, request]);

  const onQuestTypeChange = (id?: string): void => {
    console.log('onQuestTypeChange: ' + id);
    setRequest({ololo: 1});
  }

  const onFearLevelChange = (id?: string): void  => {
    console.log('onFearLevelChange: ' + id);
    setRequest({ololo: 1});
  }

  const onMinPriceChange = (id?: string): void  => {
    console.log('onMinPriceChange: ' + id);
    setRequest({ololo: 1});
  }

  return (
    <div className={styles.main}>

      <Criteria
        title={"Тип квеста"} onChange={onQuestTypeChange}
        buttons={[
          {id: QuestType.ESCAPE.toString(), title: "Квест в реальности"},
          {id: QuestType.PERFORMANCE.toString(), title: "Перформанс"},
        ]}
      />

      <Criteria
        title={"Уровень страха"} onChange={onFearLevelChange}
        buttons={[
          {id: FearLevel.ABSENT.toString(), title: "Вообще не страшно"},
          {id: FearLevel.MINIMAL.toString(), title: "Чуть-чуть"},
          {id: FearLevel.MODERATE.toString(), title: "Умеренно"},
          {id: FearLevel.EXTREME.toString(), title: "Экстримально"},
        ]}
      />

      <Criteria
        title={"Можем себе позволить"} onChange={onMinPriceChange}
        buttons={[
          {id: "1000", title: "1000 ₽"},
          {id: "2000", title: "2000 ₽"},
          {id: "3000", title: "3000 ₽"},
          {id: "4000", title: "4000 ₽"},
          {id: "5000", title: "5000 ₽"},
          {id: "more", title: "Больше"},
        ]}
      />

    </div>
  );
}
