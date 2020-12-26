import React, {useEffect, useState} from 'react';
import styles from './Schedule.module.scss';
import {SlotList} from 'models/Slot';
import {getSlotList} from 'api/getSlotList';
import {startCase} from 'lodash';

export default function Schedule(props: { questId: string }): JSX.Element {

  const [slotList, setSlotList] = useState<SlotList | undefined>(undefined);

  const {questId} = props;

  useEffect(() => {
    getSlotList(questId)
      .then(list => {
        setSlotList(list);
      });
  }, [questId, setSlotList]);

  if (slotList === undefined) {
    return <></>;
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
      {prepareSlotList(slotList).map((byDateItem, idx) => (
        <div key={idx} className={styles.row}>
          <span className={styles.day}>{formattedDate(byDateItem.date)}</span>
          {byDateItem.groupedByPrice.map((byPriceItem, ix) => (
            <div key={ix} className={styles.block}>
              <div className={styles.timeList}>
                {byPriceItem.slotList.map((slot, i) => (
                  <div key={i} className={styles.time}>{formattedTime(slot.dateTimeLocal)}</div>
                ))}
              </div>
              <div className={styles.price}>
                <div className={styles.old}><span>{byPriceItem.priceWithoutDiscount} ₽</span></div>
                <div className={styles.new}><span>{byPriceItem.priceWithDiscount} ₽</span></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

type GroupedByPrice = {
  slotList: SlotList;
  priceWithoutDiscount: number;
  priceWithDiscount: number;
};

type GroupedByDate = Array<{
  date: string;
  groupedByPrice: Array<GroupedByPrice>;
}>;

const prepareSlotList = (list: SlotList): GroupedByDate => {
  const groupByDate = (lst: SlotList): Map<string, SlotList> => {
    const groupedByDate = new Map<string, SlotList>();
    lst.forEach(slot => {
      const date = (new Date(slot.dateTimeLocal)).toISOString().split('T')[0];
      const value = groupedByDate.get(date);
      if (value !== undefined) {
        value.push(slot);
      } else {
        groupedByDate.set(date, [slot]);
      }
    });

    return groupedByDate;
  };

  const result: GroupedByDate = [];

  groupByDate(list).forEach(((slots, date) => {
    const groupedByPrice = new Array<GroupedByPrice>();
    slots.forEach((s) => {
      if (groupedByPrice.length !== 0) {
        const last = groupedByPrice[groupedByPrice.length - 1];
        if (
          last.priceWithoutDiscount === s.priceWithoutDiscount
          && last.priceWithDiscount === s.priceWithDiscount
        ) {
          last.slotList.push(s);
          return;
        }
      }

      groupedByPrice.push({
        slotList: [s],
        priceWithoutDiscount: s.priceWithoutDiscount,
        priceWithDiscount: s.priceWithDiscount
      });
    });

    result.push({
      date: date,
      groupedByPrice: groupedByPrice,
    });
  }));

  return result;
};

const formattedDate = (date: string): string => {
  const monthAndDay = new Date(date + 'T00:00:00Z')
    .toLocaleString('ru-RU', {month: 'long', day: 'numeric', timeZone: 'UTC'});
  const dayOfWeek = startCase(
    new Date(date + 'T00:00:00Z')
      .toLocaleString('ru-RU', {weekday: 'short', timeZone: 'UTC'})
  );

  return `${monthAndDay}, ${dayOfWeek}`;
};

const formattedTime = (dateTime: string): string => (
  new Date(dateTime).toLocaleString(
    'ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    })
);
