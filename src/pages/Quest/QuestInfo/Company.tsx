import React from 'react';
import {Quest as QuestModel} from 'models/Quest';
import styles from './Company.module.scss';
import appConfig from 'config/appConfig';

export default function Company(props: {
  quest: QuestModel
}): JSX.Element {
  const {quest} = props;

  return (
    <div className={styles.main}>
      <span className={styles.header}>Организатор:</span>
      <div className={styles.title}>{quest.companyTitle}</div>
      <div className={styles.phone}>
        <a href={`tel:${appConfig.phone.normalized}`}>{appConfig.phone.pretty}</a>
      </div>

      {quest.metros.map((metro, idx) =>
        <div key={idx} className={styles.metro}>{metro.title}</div>
      )}

      <div className={styles.address}>{quest.locationAddress}</div>
    </div>
  );
}
