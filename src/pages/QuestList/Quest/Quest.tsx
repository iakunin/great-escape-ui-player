import React from 'react';
// @TODO: rewrite via CSS-modules
import './Quest.scss'
import {Quest as QuestModel} from "../../../models/Quest";

export default function Quest(
  props: { quest: QuestModel; }
) {
  const quest = props.quest;

  return (
    <div className="box"
         // @TODO: implement background url to the quest
         // style='background: transparent url("/images/quests/<?= $quest->id ?>_cat.jpg") repeat scroll 0% 0% / cover'
    >

      {/* Begin Информация о квесте*/}
      <div className="inn">
        <div className="tit">
          <div className="inner">{quest.title}</div>
        </div>
        <div className="discount">клубная скидка</div>
        <div className="procent">{quest.discount}%</div>
        <div className="info">
          <span className="time">{quest.durationInMinutes} мин.</span>
          <span className="player">
            {quest.playersMinCount}-{quest.playersMaxCount} игрока
          </span>
          <span className="metro">{quest.metro}</span>
        </div>

        {/* Begin Блок рейтинга*/}
        <div className="likebox">
          <div className="countlike">234</div>
          <div className="likepercent">Понравилось <span className="prec">83%</span></div>
          <div className="clearfix"/>
          <div className="bot">
            <div className="minus"/>
            <div className="scale">
              <div className="good"/>
            </div>
            <div className="plus"/>
          </div>
        </div>
        {/* End Блок рейтинга*/}

        <div className="graybg"/>
      </div>
      {/* End Информация о квесте*/}


      {/* Begin Описание при наведении*/}
      <div className="backbox">
        <div className="tit">
          <div className="inner">{quest.title}</div>
        </div>

        <div className="price">от <span>{quest.minPrice} ₽</span></div>

        <div className="theme">{quest.company.title}</div>

        <div className="txt">{quest.description}</div>

        {/* @TODO: build link to quest page using `quest.slug` */}
        <a href="/inner?id=123123">Подробнее</a>
      </div>
      {/* End Описание при наведении */}
    </div>
  );
}
