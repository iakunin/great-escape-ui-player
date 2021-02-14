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
      <div className={mainClassName(props.slot)} onClick={() => setOpen(props.slot.isAvailable)}>
        <div className={styles.time}>
          {props.slot.formattedTime}
        </div>

        {
          props.slot.isAvailable &&
          <div className={styles.price}>
            <div className={styles.old}><span>{props.slot.priceOriginal} ₽</span></div>
            <div className={styles.new}><span>{props.slot.priceWithDiscount} ₽</span></div>
          </div>
        }

      </div>
      <BookForm open={isOpen} slot={props.slot} quest={props.quest}
                onClose={() => setOpen(false)}
      />
    </>
  );
}

const mainClassName = (slot: SlotModel): string => {
  if (slot.isAvailable) {
    return `${styles.main}`;
  }

  return `${styles.main} ${styles.notAvailable}`;
};
