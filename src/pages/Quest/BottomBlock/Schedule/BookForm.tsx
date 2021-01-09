import React, {useState} from 'react';
import Popup from 'components/Popup';
import {useForm} from 'react-hook-form';
import Form from 'components/Form';
import InputValidated from 'components/Form/InputValidated';
import config from 'config/appConfig';
import TextAreaValidated from 'components/Form/TextAreaValidated';
import SubmitButton from 'components/Form/SubmitButton';
import InputMaskedAndValidated from 'components/Form/InputMaskedAndValidated';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';
import {sendOtp} from 'api/sendOtp';
import {createBooking} from 'api/createBooking';
import assertUnreachable from 'utils/assertUnreachable';

type Inputs = {
  slotId: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
};

function BookingInfo(props: {
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

function SmsStep(props: {
  slot: SlotModel,
  quest: QuestModel,
  onSubmit: (otp: string) => void,
}): JSX.Element {

  const MASK_PLACEHOLDER = '_';

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const otp = e.target.value;

    if (otp && !otp.includes(MASK_PLACEHOLDER)) {
      props.onSubmit(otp);
    }
  };

  return (
    <>
      <p>Для подтверждения брони, пожалуйста, введите код из SMS:</p>

      {/* @TODO: add resend OTP with countdown timer */}

      <InputMaskedAndValidated
        mask="999-999" name="otp" placeholder="Код из SMS" onChange={onChange}
      />
    </>
  );
}

function MainStep(props: {
  slot: SlotModel,
  quest: QuestModel,
  onSubmit: (inputs: Inputs) => void,
}): JSX.Element {

  const {register, handleSubmit, errors} = useForm<Inputs>();

  // @TODO: здесь нужно сделать pre-flight запрос на /booking, чтобы гарантировать,
  //   что на втором шаге не будет ошибок по полям из первого шага (name/email/phone)
  //   и если пришли ошибки, то необходимо разложить их по соответствующим полям

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>

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
        placeholder="Комментарий" name="comment" rows={4} inputRef={register()}
        error={errors.comment?.message}
      />

      <input type="hidden" name="slotId" value={props.slot.id} ref={register()}/>

      <SubmitButton text="Забронировать"/>
    </Form>
  );
}


enum Step {
  Main,
  Sms,
  Success,
  Failure
}

export default function BookForm(props: {
  slot: SlotModel,
  quest: QuestModel,
  open?: boolean,
  onClose?: () => void
}): JSX.Element {

  const [inputs, setInputs] = useState<Inputs>();

  const mainStepSubmit = (inp: Inputs): void => {

    sendOtp({phone: inp.phone})
      .then()
      .catch()
    ;

    // @TODO: show this step only if no errors

    setInputs(inp);
    setStep(Step.Sms);
  };

  const smsStepSubmit = (otp: string): void => {
    if (inputs !== undefined) {
      createBooking({...inputs, otp: otp})
        .then()
        .catch()
      ;

      // @TODO: show this step only if there are no errors
      setStep(Step.Success);

      // @TODO: refresh slot list for quest (to disable booking for the same time)
    }
  };

  const [step, setStep] = useState(Step.Main);

  const title = (step: Step): string => {
    switch (step) {
      case Step.Main:
        return 'Забронировать игру';
      case Step.Sms:
        return 'Код из SMS';
      case Step.Success:
        return 'Бронирование успешно!';
      case Step.Failure:
        return 'Упс, что-то пошло не так';
      default:
        assertUnreachable(step);
    }
  };

  const child = (step: Step): JSX.Element => {
    switch (step) {
      case Step.Main:
        return <MainStep slot={props.slot} quest={props.quest} onSubmit={mainStepSubmit}/>;
      case Step.Sms:
        return <SmsStep slot={props.slot} quest={props.quest} onSubmit={smsStepSubmit}/>;
      case Step.Success:
        return <BookingInfo slot={props.slot} quest={props.quest}/>;
      case Step.Failure:
        // @TODO: show some error info
        return <BookingInfo slot={props.slot} quest={props.quest}/>;
      default:
        assertUnreachable(step);
    }
  };

  return (
    <Popup open={props.open} title={title(step)} onClose={props.onClose}>
      {child(step)}
    </Popup>
  );
}
