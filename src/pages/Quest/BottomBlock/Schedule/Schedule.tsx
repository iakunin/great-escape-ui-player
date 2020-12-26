import React, {useEffect, useState} from 'react';
import styles from './Schedule.module.scss';
import {SlotList} from 'models/Slot';
import {getSlotList} from 'api/getSlotList';

export default function Schedule(props: { questId: string }): JSX.Element {

  const [slotList, setSlotList] = useState<PreparedSlotList | undefined>(undefined);

  const {questId} = props;

  useEffect(() => {
    getSlotList(questId)
      .then(list => {
        setSlotList(prepareSlotList(list));
      });
  }, [questId, setSlotList]);

  if (slotList === undefined) {
    return <></>;
  }

  type PreparedSlotList = Array<{
    date: string;
    dayOfWeek: string;
    slotList: Array<{
      time: string;
      priceWithoutDiscount: number;
      priceWithDiscount: number;
    }>;
  }>;

  function prepareSlotList(list: SlotList): PreparedSlotList {
    const mapped = list.map(slot => ({...slot, dateTimeLocal: new Date(slot.dateTimeLocal)}));
    type SlotWithDate = typeof mapped[0];

    const grouped = new Map<string, SlotWithDate[]>();
    mapped.forEach(slot => {
      const date = slot.dateTimeLocal.toISOString().split('T')[0];
      const value = grouped.get(date);
      if (value !== undefined) {
        value.push(slot);
      } else {
        grouped.set(date, [slot]);
      }
    });

    const result: PreparedSlotList = [];

    grouped.forEach(((slots, key) => {
      const date = new Date(key + 'T00:00:00Z');
      result.push({
        date: date.toLocaleString('ru-RU', {month: 'long', day: 'numeric', timeZone: 'UTC'}),
        dayOfWeek: date.toLocaleString('ru-RU', {weekday: 'long', timeZone: 'UTC'}),
        slotList: slots.map(slot => ({
          time: slot.dateTimeLocal.toLocaleString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
          }),
          priceWithoutDiscount: slot.price,
          priceWithDiscount: Math.ceil(slot.price * slot.discountInPercents / 100),
        })),
      });
    }));

    return result;
  }

  if (slotList?.length === 0) {
    return (
      <div className={styles.main}>
        <div className={styles.notFound}>
          Увы, для данного квеста нет расписания :(
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {slotList.map((slot, idx) => (
        <div key={idx} className={styles.row}>
          <span className={styles.day}>{slot.date}, {slot.dayOfWeek}</span>

          {slot.slotList.map((item, ix) => (
            <div key={ix} className={styles.block}>
              <div className={styles.time}>
                <div className={styles.box}>{item.time}</div>
              </div>
              <div className={styles.price}>
                <div className={styles.old}><span>{item.priceWithoutDiscount} ₽</span></div>
                <div className={styles.new}><span>{item.priceWithDiscount} ₽</span></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
