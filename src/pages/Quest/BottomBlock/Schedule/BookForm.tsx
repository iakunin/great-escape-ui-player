import React, {useState} from 'react';
import Popup from 'components/Popup';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';
import {sendOtp} from 'api/sendOtp';
import {createBooking, Request as BookingRequest} from 'api/createBooking';
import assertUnreachable from 'utils/assertUnreachable';
import SmsStep from './BookForm/SmsStep';
import BookingInfo from './BookForm/BookingInfo';
import MainStep from './BookForm/MainStep';

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

  const [step, setStep] = useState(Step.Main);
  const [request, setRequest] = useState<BookingRequest>();

  const mainStepSubmit = (rq: BookingRequest): void => {
    sendOtp({phone: rq.phone})
      .then()
      .catch()
    ;

    // @TODO: show this step only if no errors
    setRequest(rq);
    setStep(Step.Sms);
  };

  const smsStepSubmit = (otp: string): void => {
    if (request !== undefined) {
      createBooking({...request, otp: otp})
        .then()
        .catch()
      ;

      // @TODO: show this step only if there are no errors
      setStep(Step.Success);

      // @TODO: refresh slot list for quest (to disable booking for the same time)
    }
  };

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
