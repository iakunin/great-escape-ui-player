import React from 'react';
import InputMaskedAndValidated from 'components/Form/InputMaskedAndValidated';
import {Slot as SlotModel} from 'models/Slot';
import {Quest as QuestModel} from 'models/Quest';

export default function SmsStep(props: {
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
