import React, {useState} from 'react';
import styles from './BottomBlock.module.scss';
import Schedule from 'pages/Quest/BottomBlock/Schedule';
import Reviews from 'pages/Quest/BottomBlock/Reviews';

export default function BottomBlock(props: {questId: string}): JSX.Element {

  const items = [
    {
      component: <Schedule questId={props.questId}/>,
      title: 'Расписание'
    }, {
      component: <Reviews/>,
      title: 'Отзывы'
    },
  ];

  const [active, setActive] = useState(items[0]);

  const className = (item: typeof items[0]): string => (
    item.title === active.title
      ? `${styles.button} ${styles.active}`
      : `${styles.button}`
  );

  return (
    <>
      <div className={styles.buttons}>
        {items.map((item, idx) => (
          <div key={idx} className={className(item)} onClick={(): void => setActive(item)}>
            {item.title}
          </div>
        ))}
      </div>
      {active.component}
    </>
  );
}
