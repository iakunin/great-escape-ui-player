import React from 'react';
import Slider from 'pages/Quest/Slider';

// @TODO: rewrite me via CSS-module
import './Quest.scss';

const quest = {
  images: [
    'https://great-escape.ru/images/quests/2_1.jpg',
    'https://great-escape.ru/images/quests/2_2.jpg',
    'https://great-escape.ru/images/quests/2_3.jpg',
  ]
};

export default function Quest(): JSX.Element {
  // const { slug } = useParams<QuestParams>();

  return (
    <div className="questinfo clearfix">
      <Slider urls={quest.images} />
    </div>
  );
}
