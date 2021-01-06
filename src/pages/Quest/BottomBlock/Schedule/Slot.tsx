import React, {useState} from 'react';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';
import styles from './Slot.module.scss';
import BookForm from 'pages/Quest/BottomBlock/Schedule/BookForm';

export default function Slot(props: {
  slot: SlotModel;
  quest: QuestModel;
}): JSX.Element {

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={timeClassName(props.slot)}
           onClick={(): void => setOpen(props.slot.isAvailable)}
      >
        {props.slot.formattedTime}
      </div>
      <BookForm open={isOpen} slot={props.slot} quest={props.quest}
                onClose={(): void => setOpen(false)}
      />
    </>
  );
}

const timeClassName = (slot: SlotModel): string => {
  if (slot.isAvailable) {
    return `${styles.time}`;
  }

  return `${styles.time} ${styles.notAvailable}`;
};
