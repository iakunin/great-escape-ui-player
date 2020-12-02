import React, {useState} from 'react';
import styles from './FeedbackForm.module.scss';
import {useForm} from "react-hook-form";
import axios from 'axios';
import Popup from "../../../components/Popup";

// @TODO: add captcha to this feedback form

type Inputs = {
  name: string;
  email: string;
  text: string;
};

export default function FeedbackForm() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(<></>);
  const [popupTitle, setPopupTitle] = useState('');

  const {register, handleSubmit, errors, reset} = useForm<Inputs>();

  const handleSuccess = () => {
    reset();
    setPopupTitle('Спасибо за обращение!');
    setPopupContent(<>Мы ответим вам настолько быстро, насколько это возможно.</>);
    setPopupOpen(true);
  }

  const handleFailure = () => {
    reset();
    setPopupTitle('К сожалению, произошла ошибка');
    setPopupContent(
      <>
        <p>Увы, мы не смогли отправить Ваше обращение.</p>
        <p>Попробуте повторить попытку через некоторое время.</p>
        <br/>
        <p>Если и это не помогло &mdash; обязательно позвоните нам.</p>
      </>
    );
    setPopupOpen(true);
  }

  const onSubmit = handleSubmit((data: Inputs) => {
    axios.post(
      //@TODO: extract `baseUrl` into config
      'http://localhost:8080/api/feedback',
      data
    )
      .then(handleSuccess, handleFailure)
      .catch(handleFailure);
  });

  return (
    <>
      <div className={styles.main}>
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
          <textarea placeholder="Текст сообщения" rows={6} name="text"
                    ref={register({required: 'Это поле обязательно'})}
          />
            {errors.text && <div className={styles.error}>{errors.text.message}</div>}
          </div>

          <input type="submit" value="Отправить" className={styles.button}/>

        </form>
      </div>

      <Popup open={isPopupOpen} onClose={() => setPopupOpen(false)} title={popupTitle}>
        {popupContent}
      </Popup>
    </>
  );
}