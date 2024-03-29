import React, {useState} from 'react';
import styles from './FeedbackForm.module.scss';
import {useForm} from 'react-hook-form';
import Popup from 'components/Popup';
import {createFeedback} from 'api/createFeedback';
import InputValidated from 'components/Form/InputValidated';
import config from 'config/appConfig';
import TextAreaValidated from 'components/Form/TextAreaValidated';
import SubmitButton from 'components/Form/SubmitButton';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

type Inputs = {
  name: string;
  email: string;
  text: string;
};

export default function FeedbackForm(): JSX.Element {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(<></>);
  const [popupTitle, setPopupTitle] = useState('');

  const {register, handleSubmit, errors, reset} = useForm<Inputs>();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSuccess = (): void => {
    reset();
    setPopupTitle('Спасибо за обращение!');
    setPopupContent(<>Мы ответим вам настолько быстро, насколько это возможно.</>);
    setPopupOpen(true);
  };

  const handleFailure = (): void => {
    reset();
    setPopupTitle('К сожалению, произошла ошибка');
    setPopupContent(
      <>
        <p>Увы, мы не смогли отправить Ваше обращение.</p>
        <p>Попробуте повторить попытку через некоторое время.</p>
        <br/>
        <p>Если и это не помогло &mdash; обязательно сообщите нам об этом.</p>
      </>
    );
    setPopupOpen(true);
  };

  const onSubmit = handleSubmit((inputs: Inputs) => {
    createFeedback(
      inputs,
      executeRecaptcha !== undefined
        ? executeRecaptcha('FeedbackForm')
        : undefined
    )
      .then(handleSuccess)
      .catch(handleFailure);
  });

  return (
    <>
      <div className={styles.main}>
        <form className={styles.form} onSubmit={onSubmit}>
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

          <TextAreaValidated
            placeholder="Текст сообщения" name="text" rows={6} error={errors.text?.message}
            inputRef={register({required: 'Это поле обязательно'})}
          />

          <SubmitButton text="Отправить" />
        </form>
      </div>

      <Popup open={isPopupOpen} onClose={(): void => setPopupOpen(false)} title={popupTitle}>
        {popupContent}
      </Popup>
    </>
  );
}
