import React, {Component} from 'react';
import styles from './Search.module.scss'
import {Quest} from "../../../models";
import {trackPromise} from 'react-promise-tracker';
import {Areas, FearLevel, QuestType} from "../../../enums";
import axios, {AxiosResponse} from "axios";
import Criteria from "./Criteria";

function handleClick(event: React.MouseEvent): void {
  event.preventDefault();
  trackPromise(
    new Promise(r => setTimeout(r, 550)),
    Areas.QuestList
  ).then(() => {
  });
}

type ComponentProps = {
  onQuestsChange: (quests: Array<Quest>) => void;
}

export default class Search extends Component<ComponentProps> {

  componentDidMount = (): void => {
    trackPromise(
      axios.get(
        //@TODO: extract `baseUrl` into config
        'http://localhost:8080/api/quests'
      )
        .then((response: AxiosResponse<Array<Quest>>) => {
          this.props.onQuestsChange(response.data)
        })
    ).then(() => {
    });
  }

  render = (): JSX.Element => (
    <div className={styles.main}>

      <Criteria title={"Тип квеста"} buttons={[
        {id: QuestType.ESCAPE.toString(), title: "Квест в реальности"},
        {id: QuestType.PERFORMANCE.toString(), title: "Перформанс"},
      ]}/>

      <Criteria title={"Уровень страха"} buttons={[
        {id: FearLevel.ABSENT.toString(), title: "Вообще не страшно"},
        {id: FearLevel.MINIMAL.toString(), title: "Чуть-чуть"},
        {id: FearLevel.MODERATE.toString(), title: "Умеренно"},
        {id: FearLevel.EXTREME.toString(), title: "Экстримально"},
      ]}/>

      <Criteria title={"Можем себе позволить"} buttons={[
        {id: "1000", title: "1000 ₽"},
        {id: "2000", title: "2000 ₽"},
        {id: "3000", title: "3000 ₽"},
        {id: "4000", title: "4000 ₽"},
        {id: "5000", title: "5000 ₽"},
        {id: "more", title: "Больше"},
      ]}/>

    </div>
  );
}
