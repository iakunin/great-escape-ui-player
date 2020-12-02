import React, {Component} from 'react';
// @TODO: rewrite via CSS-modules
import './Search.scss'
import {Quest} from "../../../models";
import {trackPromise} from 'react-promise-tracker';
import {Areas} from "../../../enums";
import axios, {AxiosResponse} from "axios";

function handleClick(event: React.MouseEvent): void {
  event.preventDefault();
  trackPromise(
    new Promise(r => setTimeout(r, 150)),
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
    <div id="sidefilter" className="sidebar clearfix">
      <div className="cont">

        <form action="#" id="search-form">
          <input type="text" placeholder="Поиск"/>
          <input type="submit" value=""/>
        </form>

        <div className="theme criteria criteria-type">
          <div className="tit">Мы хотим</div>
          <div className="btn" onClick={handleClick}>испугаться</div>
          <div className="btn">активностей</div>
          <div className="btn">18+</div>
          <div className="btn">сходить с ребенком</div>
          <div className="btn">поучаствовать в перфомансе</div>
          <div className="btn">семейные</div>
          <div className="btn">сходить ночью</div>
        </div>

        <div className="count criteria">
          <div className="tit">Нас будет</div>
          <div id="personCount2" className="btn">Двое</div>
          <div id="personCount3" className="btn">Трое</div>
          <div id="personCount4" className="btn">Четверо</div>
          <div id="personCount5" className="btn">Пятеро</div>
          <div id="personCount6" className="btn">Шестеро</div>
          <div id="personCount-1" className="btn">Больше</div>
        </div>

        <div className="time criteria">
          <div className="tit">Продолжительность квеста</div>
          <div id="time60" className="btn btn-icon-time">60</div>
          <div id="time90" className="btn btn-icon-time">90</div>
          <div id="time-1" className="btn">Больше</div>
        </div>

        <div className="pay criteria">
          <div className="tit">Можем себе позволить</div>
          <div id="price1000" className="btn">1000 р</div>
          <div id="price2000" className="btn">2000 р</div>
          <div id="price3000" className="btn">3000 р</div>
          <div id="price4000" className="btn">4000 р</div>
          <div id="price-1" className="btn">Больше</div>
        </div>

        <div className="level criteria">
          <div className="tit">Наша команда</div>
          <div className="btn">Начинающая</div>
          <div className="btn">Опытная</div>
          <div className="btn">Профессионалы</div>
        </div>

      </div>

      <div className="up">Фильтр</div>

    </div>
  );
}
