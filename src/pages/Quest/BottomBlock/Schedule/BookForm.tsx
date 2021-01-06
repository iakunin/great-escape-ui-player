import React from 'react';
import Popup from 'components/Popup';
import {useForm} from 'react-hook-form';
import {createBooking} from 'api/createBooking';
import Form from 'components/Form';
import InputValidated from 'components/Form/InputValidated';
import config from 'config/appConfig';
import TextAreaValidated from 'components/Form/TextAreaValidated';
import SubmitButton from 'components/Form/SubmitButton';
import PhoneValidated from 'components/Form/PhoneValidated';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';

type Inputs = {
  slotId: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
};

export default function BookForm(props: {
  slot: SlotModel,
  quest: QuestModel,
  open?: boolean,
  onClose?: () => void
}): JSX.Element {

  const {register, handleSubmit, errors, reset} = useForm<Inputs>();

  const handleSuccess = (): void => {
    reset();
  };

  const handleFailure = (): void => {
    reset();
  };

  const onSubmit = handleSubmit((data: Inputs) => {
    createBooking(data)
      .then(handleSuccess, handleFailure)
      .catch(handleFailure)
    ;
  });

  return (
    <Popup open={props.open} title="Забронировать игру" onClose={props.onClose}>

      {/* @TODO: add Successfully booked state (from FeedbackForm) */}

      {/* @TODO: add OTP phone verification */}

      <p>Вы бронируете квест "{props.quest.title}".</p>
      <p>
        Сеанс {props.slot.formattedDate} ({props.slot.weekDayLong}) в {props.slot.formattedTime}.
      </p>
      <p>Стоимость со скидкой: {props.slot.priceWithDiscount}₽.</p>

      <Form onSubmit={onSubmit}>

        <InputValidated
          placeholder="Имя" name="name" error={errors.name?.message}
          inputRef={register({required: 'Это поле обязательно'})}
        />

        <InputValidated
          placeholder="E-mail" name="email" error={errors.email?.message}
          inputRef={register({
            required: 'Это поле обязательно',
            pattern: {
              value: config.regexp.email,
              message: 'Неверный формат email'
            }
          })}
        />

        <PhoneValidated
          mask="+7 999 999-99-99" name="phone" placeholder="Телефон" error={errors.phone?.message}
          inputRef={register({
            required: 'Это поле обязательно',
            pattern: {
              value: config.regexp.phone,
              message: 'Неверный формат телефона'
            }
          })}
        />

        <TextAreaValidated
          placeholder="Комментарий" name="comment" rows={4} inputRef={register()}
          error={errors.comment?.message}
        />

        <input type="hidden" name="slotId" value={props.slot.id} ref={register()}/>

        <SubmitButton text="Забронировать" />

      </Form>
    </Popup>
  );
}
