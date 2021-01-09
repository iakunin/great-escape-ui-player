import React from 'react';
import InputMaskedAndValidated from 'components/Form/InputMaskedAndValidated';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';
import {useForm} from 'react-hook-form';
import Form from 'components/Form';
import BookingInfo from 'pages/Quest/BottomBlock/Schedule/BookForm/BookingInfo';
import InputValidated from 'components/Form/InputValidated';
import config from 'config/appConfig';
import TextAreaValidated from 'components/Form/TextAreaValidated';
import SubmitButton from 'components/Form/SubmitButton';
import {createBooking, Request as BookingRequest} from 'api/createBooking';
import {AxiosError} from 'axios';
import {ErroneousResponse, ErrorKey} from 'api/common';

export default function MainStep(props: {
  slot: SlotModel,
  quest: QuestModel,
  onSubmit: (inputs: BookingRequest) => void,
}): JSX.Element {

  const {register, handleSubmit, errors, setError} = useForm<BookingRequest>();

  const onSubmit = (inputs: BookingRequest): void => {
    const FAKE_OTP = 'fakeOtp';

    createBooking({...inputs, dryRun: true, otp: FAKE_OTP})
      .then((): void => {
        props.onSubmit(inputs);
      })
      .catch((err: AxiosError<ErroneousResponse>) => {
        if (err.response && err.response.data.errorKey === ErrorKey.EmailExists) {
          setError('email', {message: 'Такой email уже зарегистрирован в системе'});
          return;
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <BookingInfo slot={props.slot} quest={props.quest}/>

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

      <InputMaskedAndValidated
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
        placeholder="Комментарий (необязательно)" name="comment" rows={4} inputRef={register()}
        error={errors.comment?.message}
      />

      <input type="hidden" name="slotId" value={props.slot.id} ref={register()}/>

      <SubmitButton text="Забронировать"/>
    </Form>
  );
}
