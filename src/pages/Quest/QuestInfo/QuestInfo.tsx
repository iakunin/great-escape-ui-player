import React from 'react';
import {Quest as QuestModel} from 'models/Quest';
import styles from './QuestInfo.module.scss';
import Quest from './Quest';
import Company from './Company';

export default function QuestInfo(props: {
  quest: QuestModel,
}): JSX.Element {
  return (
    <div className={styles.main}>
      <Quest quest={props.quest} />
      <Company quest={props.quest} />
    </div>
  );
}
