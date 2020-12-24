import React from 'react';
import Slider from 'pages/Quest/Slider';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {QuestParams} from 'enums/Routes';
import BottomBlock from 'pages/Quest/BottomBlock';
import QuestInfo from 'pages/Quest/QuestInfo';
import styles from './Quest.module.scss';

const quest = {
  slug: 'professor-zlikh',
  title: 'Профессор Злых',
  coverPhoto: 'https://great-escape.ru/images/quests/2_1.jpg',
  photos: [
    {url: 'https://great-escape.ru/images/quests/2_1.jpg'},
    {url: 'https://great-escape.ru/images/quests/2_2.jpg'},
    {url: 'https://great-escape.ru/images/quests/2_3.jpg'},
  ],
  minPrice: 1200,
  discountInPercents: 23,
  description: 'Записать свой собственный альбом — задача не из легких, особенно если у вас ' +
    'всего один час, а в звукозаписывающих студиях вы ни разу не б...',
  durationInMinutes: 66,
  playersMinCount: 2,
  playersMaxCount: 6,
  companyTitle: 'ООО Адреналин-24',
  metros: [
    {
      slug: 'slug',
      title: 'Павелецкая',
    }, {
      slug: 'slug',
      title: 'Комсомольская',
    }
  ],
  locationAddress: 'Космодамианская набережная, д. 46/50, стр. 1',
};


function Quest(props: RouteComponentProps<QuestParams>): JSX.Element {
  // const { slug } = useParams<QuestParams>();

  // const slug = props.match.params.slug;

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
