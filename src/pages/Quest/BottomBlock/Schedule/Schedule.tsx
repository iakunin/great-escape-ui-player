import React, {useEffect, useState} from 'react';
import styles from './Schedule.module.scss';
import {SlotList} from 'models/Slot';
import {getSlotList} from 'api/getSlotList';
import Slot from './Slot';
import {Quest as QuestModel} from 'models/Quest';
import {startCase} from 'lodash';

export default function Schedule(props: { quest: QuestModel }): JSX.Element {

  const [slotList, setSlotList] = useState<SlotList | undefined>(undefined);

  const questId = props.quest.id;

  useEffect(() => {
    const from = new Date();
    from.setUTCHours(0, 0, 0, 0);

    const FETCH_PERIOD_DAYS = 15;
    const to = new Date();
    to.setUTCHours(23, 59, 59, 0);
    to.setDate(to.getDate() + FETCH_PERIOD_DAYS - 1);

    getSlotList(questId, from, to)
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
          <span className={styles.day}>
            {byDateItem.slotList[0]?.formattedDate}{', '}
            {startCase(byDateItem.slotList[0]?.weekDayShort)}
          </span>
          <div className={styles.timeList}>
            {byDateItem.slotList.map((slot, i) => (
              <Slot key={i} slot={slot} quest={props.quest}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type GroupedByDate = Array<{
  date: string;
  slotList: SlotList;
}>;

const prepareSlotList = (list: SlotList): GroupedByDate => {
  const byDate = new Map<string, SlotList>();

  list.forEach(slot => {
    const date = (new Date(slot.dateTimeLocal)).toISOString().split('T')[0];
    const value = byDate.get(date);
    if (value !== undefined) {
      value.push(slot);
    } else {
      byDate.set(date, [slot]);
    }
  });

  return Array.from(
    byDate,
    ([date, slots]) => ({
      date: date,
      slotList: slots,
    })
  );
};
