import React, {useState} from 'react';
import {Slot as SlotModel} from 'models/Slot';
import styles from './Slot.module.scss';
import BookForm from 'pages/Quest/BottomBlock/Schedule/BookForm';

export default function Slot(props: { slot: SlotModel }): JSX.Element {

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={timeClassName(props.slot)} onClick={(): void => setOpen(true)}>
        {formattedTime(props.slot.dateTimeLocal)}
      </div>
      <BookForm open={isOpen} slotId={props.slot.id} onClose={(): void => setOpen(false)}/>
    </>
  );
}

const formattedTime = (dateTime: string): string => (
  new Date(dateTime).toLocaleString(
    'ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    })
);

const timeClassName = (slot: SlotModel): string => {
  if (slot.isAvailable) {
    return `${styles.time}`;
  }

  return `${styles.time} ${styles.notAvailable}`;
};
