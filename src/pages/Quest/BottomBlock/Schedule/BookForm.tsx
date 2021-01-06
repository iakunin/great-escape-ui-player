import React from 'react';
import Popup from 'components/Popup';
import {useForm} from 'react-hook-form';
import styles from './BookForm.module.scss';
import InputMask from 'react-input-mask';
import {createBooking} from 'api/createBooking';

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


      {/* @TODO: избавиться от копи-пасты стилей форм и полей */}
      <form className={styles.form} onSubmit={onSubmit}>

        <div className={styles.fieldGroup}>
          <input placeholder="Имя" name="name"
                 ref={register({required: 'Это поле обязательно'})}/>
          {errors.name && <div className={styles.error}>{errors.name.message}</div>}
        </div>

        <div className={styles.fieldGroup}>
          <input placeholder="E-mail" name="email"
                 ref={register({
                   required: 'Это поле обязательно',
                   pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: 'Неверный формат email'
                   }
                 })}
          />
          {errors.email && <div className={styles.error}>{errors.email.message}</div>}
        </div>

        <div className={styles.fieldGroup}>
          <InputMask
            mask="+7 999 999-99-99" type="tel" name="phone" placeholder="Телефон"
            inputRef={(el: HTMLInputElement): void => register(el, {
              required: 'Это поле обязательно',
              pattern: {
                value: /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/i,
                message: 'Неверный формат телефона'
              }
            })}
          />
          {errors.phone && <div className={styles.error}>{errors.phone.message}</div>}
        </div>

        <div className={styles.fieldGroup}>
          <textarea placeholder="Комментарий" rows={4} name="comment" ref={register()}/>
          {errors.comment && <div className={styles.error}>{errors.comment.message}</div>}
        </div>

        <input type="hidden" name="slotId" value={props.slotId} ref={register()}/>

        <input type="submit" value="Забронировать" className={styles.button}/>

      </form>
    </Popup>
  );
}
