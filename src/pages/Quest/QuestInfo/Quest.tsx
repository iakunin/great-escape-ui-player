import React from 'react';
import {Quest as QuestModel} from 'models/Quest';
import styles from './Quest.module.scss';

export default function Quest(props: {
  quest: QuestModel,
}): JSX.Element {
  const {quest} = props;

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

      <div className={styles.description}>
        {quest.description
          .split('\n')
          .map((item, key) => (<span key={key}>{item}<br/></span>))
        }
      </div>

      <div className={styles.extraInfo}>
        <div className={styles.duration}>{quest.durationInMinutes} мин.</div>
        <div className={styles.playersCount}>
          {quest.playersMinCount}-{quest.playersMaxCount} игрока
        </div>
      </div>

      <div className={styles.details}>
        {quest.details
          .split('\n')
          .map((item, key) => (<span key={key}>{item}<br/></span>))
        }
      </div>
    </div>
  );
}
