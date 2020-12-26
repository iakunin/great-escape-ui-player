import React, {useEffect, useState} from 'react';
import styles from './Schedule.module.scss';
import {SlotList} from 'models/Slot';
import {getSlotList} from 'api/getSlotList';
import {startCase} from 'lodash';

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

  type PreparedSlot = {
    timeList: Array<string>;
    priceWithoutDiscount: number;
    priceWithDiscount: number;
    discountInPercents: number;
  };

  type PreparedSlotList = Array<{
    date: string;
    dayOfWeek: string;
    slotList: Array<PreparedSlot>;
  }>;

  function prepareSlotList(list: SlotList): PreparedSlotList {
    const grouped = new Map<string, SlotList>();
    list.forEach(slot => {
      const date = (new Date(slot.dateTimeLocal)).toISOString().split('T')[0];
      const value = grouped.get(date);
      if (value !== undefined) {
        value.push(slot);
      } else {
        grouped.set(date, [slot]);
      }
    });

    const result: PreparedSlotList = [];

    grouped.forEach(((slots, key) => {
      const _slotList = new Array<PreparedSlot>();
      slots.forEach((s) => {
        const time = (new Date(s.dateTimeLocal)).toLocaleString(
          'ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
          });

        if (_slotList.length !== 0) {
          const last = _slotList[_slotList.length - 1];
          if (
            last.priceWithoutDiscount === s.price
            && last.discountInPercents === s.discountInPercents
          ) {
            last.timeList.push(time);
            return;
          }
        }

        _slotList.push({
          timeList: [(new Date(s.dateTimeLocal)).toLocaleString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
          })],
          priceWithoutDiscount: s.price,
          priceWithDiscount: s.price - Math.ceil(s.price * s.discountInPercents / 100),
          discountInPercents: s.discountInPercents,
        });

      });

      result.push({
        date: new Date(key + 'T00:00:00Z')
          .toLocaleString('ru-RU', {month: 'long', day: 'numeric', timeZone: 'UTC'}),
        dayOfWeek: new Date(key + 'T00:00:00Z')
          .toLocaleString('ru-RU', {weekday: 'short', timeZone: 'UTC'}),
        slotList: _slotList,
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
          <span className={styles.day}>{slot.date}, {startCase(slot.dayOfWeek)}</span>

          {slot.slotList.map((item, ix) => (
            <div key={ix} className={styles.block}>
              <div className={styles.time}>
                {item.timeList.map((time, i) => (
                  <div key={i} className={styles.box}>{time}</div>
                ))}
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
