import React from 'react';
import styles from './Quest.module.scss';
import {Quest as QuestModel} from 'models/Quest';
import {Quest as QuestRoute} from 'enums/Routes';
import {Link} from 'react-router-dom';

export default function Quest(
  props: { quest: QuestModel; }
): JSX.Element {
  const {quest} = props;

  return (
    <div
      className={styles.main}
      style={{backgroundImage: `url(${quest.coverPhoto})`}}
    >
      <Link to={(new QuestRoute(quest.slug)).toString()}>

        <div className={styles.unhovered}>
          <div className={styles.title}>{quest.title}</div>
          <div className={styles.discountLabel}>клубная скидка</div>
          <div className={styles.discountAmount}>{quest.discountInPercents}%</div>
          <div className={styles.info}>
            <span className={styles.duration}>{quest.durationInMinutes} мин.</span>
            <span className={styles.playersCount}>
            {quest.playersMinCount}-{quest.playersMaxCount} игрока
          </span>

            {quest.metros.map((metro, idx) => (
              <span key={idx} className={styles.metro}>{metro.title}</span>
            ))}

          </div>

          {/* Uncomment me when implementing Rating&Review */}
          {/* <Rating votesCount={233} likesPercent={83}/> */}

          <div className={styles.background}/>
        </div>

        <div className={styles.hovered}>
          <div className={styles.top}>
            <div className={styles.title}>{quest.title}</div>
            <div className={styles.price}>
              от <span>{quest.minPrice} ₽</span>
            </div>
          </div>

          <div className={styles.companyTitle}>{quest.companyTitle}</div>
          <div className={styles.description}>{quest.description}</div>
        </div>

      </Link>

    </div>
  );
}
