import React from 'react';
import styles from './Search.module.scss'
import {FearLevel, QuestType} from "../../../enums";
import Criteria from "./Criteria";
import {setFearLevel, setMinPrice, setQuestType} from '../../../redux/questListRequest.slice'
import {useDispatch} from "react-redux";

export default function Search(): JSX.Element {

  const dispatch = useDispatch();

  const onQuestTypeChange = (id?: string): void => {
    dispatch(setQuestType(QuestType[id as keyof typeof QuestType]));
  }

  const onFearLevelChange = (id?: string): void => {
    dispatch(setFearLevel(FearLevel[id as keyof typeof FearLevel]));
  }

  const onMinPriceChange = (id?: string): void => {
    dispatch(setMinPrice(id !== undefined ? Number(id) : undefined));
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
          {id: "6000", title: "6000 ₽"},
          {id: "7000", title: "7000 ₽"},
          {id: "8000", title: "8000 ₽"},
          {id: "9000", title: "9000 ₽"},
        ]}
      />

    </div>
  );
}
