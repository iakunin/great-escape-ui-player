import React from 'react';
import {Quest as QuestModel} from 'models/Quest';
import styles from './Quest.module.scss';

export default function Quest(props: {
  quest: QuestModel,
  goBack(): void,
}): JSX.Element {
  const {quest, goBack} = props;

  return (
    <div className={styles.quest}>

      <div className={styles.title}>{quest.title}</div>

      <div className={styles.price}>
        <div className={styles.minPrice}>от <span>{quest.minPrice}₽</span></div>
        <div className={styles.discount}>клубная скидка</div>
        <div className={styles.percent}>{quest.discountInPercents}%</div>

        <div className={styles.query}>?
          <div className={styles.pop}>Указанная скидка не является публичной офертой и может быть
            изменена индивидуально для члена клуба.
          </div>
        </div>
      </div>

      <div className={styles.description}>{quest.description}</div>

      <div className={styles.extraInfo}>
        <div className={styles.duration}>{quest.durationInMinutes} мин.</div>
        <div className={styles.playersCount}>
          {quest.playersMinCount}-{quest.playersMaxCount} игрока
        </div>
      </div>

      <button className={styles.goBackButton} onClick={goBack}>Назад</button>
    </div>
  );
}