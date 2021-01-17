import React, {useState} from 'react';
import Popup from 'components/Popup';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';
import {sendOtp} from 'api/sendOtp';
import {createBooking, Request as BookingRequest} from 'api/createBooking';
import assertUnreachable from 'utils/assertUnreachable';
import OtpStep from './BookForm/SmsStep';
import BookingInfo from './BookForm/BookingInfo';
import MainStep from './BookForm/MainStep';
import FailureStep from './BookForm/FailureStep';
import {AxiosError} from 'axios';
import {ErroneousResponse, ErrorKey} from 'api/common';
import Spinner from 'components/Spinner';

enum Step {
  Main,
  SendingOtp,
  Otp,
  SendingMain,
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
  const [error, setError] = useState<string>();
  const [otpError, setOtpError] = useState<string>();

  const mainStepSubmit = (bookingRequest: BookingRequest): void => {
    setRequest(bookingRequest);
    setStep(Step.SendingOtp);

    sendOtp({phone: bookingRequest.phone})
      .then((): void => {
        setStep(Step.Otp);
      })
      .catch((): void => {
        setError('Возникла проблема при отправке SMS с кодом подтверждения.');
        setStep(Step.Failure);
      });
  };

  const otpStepSubmit = (otp: string): void => {
    if (request === undefined) {
      throw new Error('Request must never be empty here!');
    }

    setStep(Step.SendingMain);

    createBooking({...request, otp: otp})
      .then((): void => {
        setStep(Step.Success);
      })
      .catch((err: AxiosError<ErroneousResponse>) => {
        if (err.response && err.response.data.errorKey === ErrorKey.WrongOtp) {
          setStep(Step.Otp);
          setOtpError('Упс, неверный код: попробуйте, пожалуйста, ещё раз');
          return;
        }

        // @TODO: handle other errors from backend

        setStep(Step.Failure);
      });
  };

  const title = (step: Step): string => {
    switch (step) {
      case Step.Main:
        return 'Забронировать игру';
      case Step.SendingOtp:
        return 'Отправляем SMS';
      case Step.Otp:
        return 'Введите код из SMS';
      case Step.SendingMain:
        return 'Оформляем бронирование';
      case Step.Success:
        return 'Бронирование успешно!';
      case Step.Failure:
        return 'К сожалению, произошла ошибка';
      default:
        assertUnreachable(step);
    }
  };

  const child = (step: Step): JSX.Element => {
    switch (step) {
      case Step.Main:
        return <MainStep slot={props.slot} quest={props.quest} onSubmit={mainStepSubmit}/>;
      case Step.SendingOtp:
        return <Spinner/>;
      case Step.Otp:
        return <OtpStep
          slot={props.slot} quest={props.quest}
          onSubmit={otpStepSubmit} error={otpError}
          onChange={(): void => setOtpError(undefined)}
        />;
      case Step.SendingMain:
        return <Spinner/>;
      case Step.Success:
        return <BookingInfo slot={props.slot} quest={props.quest}/>;
      case Step.Failure:
        return <FailureStep details={error}/>;
      default:
        assertUnreachable(step);
    }
  };

  const onClose = (): void => {
    props.onClose?.();

    // @TODO: instead of this spike refresh slot list for quest
    //   (to disable booking for the same slot)
    if (step === Step.Success) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  };

  return (
    <Popup open={props.open} title={title(step)} onClose={onClose}>
      {child(step)}
    </Popup>
  );
}
