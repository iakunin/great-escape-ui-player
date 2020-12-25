import React, {useEffect, useState} from 'react';
import Slider from 'pages/Quest/Slider';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {QuestParams} from 'enums/Routes';
import BottomBlock from 'pages/Quest/BottomBlock';
import QuestInfo from 'pages/Quest/QuestInfo';
import styles from './Quest.module.scss';
import {Quest as QuestModel} from 'models/Quest';
import {getQuest} from 'api/getQuest';

function Quest(props: RouteComponentProps<QuestParams>): JSX.Element {

  const slug = props.match.params.slug;

  const [quest, setQuest] = useState<QuestModel | undefined>(undefined);

  useEffect(() => {
    getQuest(slug)
      .then(quest => {
        setQuest(quest);
      });
  }, [slug, setQuest]);

  if (quest === undefined) {
    return <></>;
  }

  return (
    <>

      <div className={styles.main}>
        <Slider urls={quest.photos.map(p => p.url)}/>
        <QuestInfo quest={quest} goBack={props.history.goBack}/>
      </div>

      <BottomBlock/>
    </>
  );
}

export default withRouter(Quest);
