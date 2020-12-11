import React, {Component} from 'react';
import styles from './Search.module.scss'
import {Quest} from "../../../models";
import {trackPromise} from 'react-promise-tracker';
import {Areas} from "../../../enums";
import axios, {AxiosResponse} from "axios";

function handleClick(event: React.MouseEvent): void {
  event.preventDefault();
  trackPromise(
    new Promise(r => setTimeout(r, 550)),
    Areas.QuestList
  ).then(() => {});
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
    ).then(() => {});
  }

  render = (): JSX.Element => (
    <div className={styles.main}>

        <div className={styles.criteria}>
          <div className={styles.title}>Тип квеста</div>

          <div className={styles.button}>Квест в реальности</div>
          <div className={styles.button}>Перформанс</div>
        </div>

        <div className={styles.criteria}>
          <div className={styles.title}>Уровень страха</div>

          <div className={`${styles.button} ${styles.active}`}>Вообще не страшно</div>
          <div className={styles.button}>Чуть-чуть</div>
          <div className={styles.button}>Умеренно</div>
          <div className={styles.button}>Экстримально</div>
        </div>

        <div className={styles.criteria}>
          <div className={styles.title}>Можем себе позволить</div>

          <div className={styles.button}>1000 р</div>
          <div className={styles.button}>2000 р</div>
          <div className={styles.button}>3000 р</div>
          <div className={styles.button}>4000 р</div>
          <div className={styles.button}>5000 р</div>
          <div className={styles.button}>Больше</div>
        </div>

    </div>
  );
}
