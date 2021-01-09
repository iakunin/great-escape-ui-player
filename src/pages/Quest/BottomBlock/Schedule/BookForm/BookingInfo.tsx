import React from 'react';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';

export default function BookingInfo(props: {
  slot: SlotModel,
  quest: QuestModel,
}): JSX.Element {

  const {slot, quest} = props;

  return (
    <>
      <p>Квест "{quest.title}".</p>
      <p>
        Сеанс {slot.formattedDate} ({slot.weekDayLong}) в {slot.formattedTime}.
      </p>
      <p>Стоимость со скидкой: {slot.priceWithDiscount}₽.</p>
    </>
  );
}
