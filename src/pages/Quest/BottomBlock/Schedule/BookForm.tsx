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

type Inputs = {
  slotId: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
};

export default function BookForm(props: {
  slotId: string,
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

      {/* @TODO: добавить название квеста */}
      {/* @TODO: добавить дату и время игры */}
      {/* @TODO: добавить цену игры + цену со скидкой */}


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

        <input type="hidden" name="slotId" value={props.slotId} ref={register()}/>

        <SubmitButton text="Забронировать" />

      </Form>
    </Popup>
  );
}
