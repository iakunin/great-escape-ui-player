import React from 'react';
import buttonStyles from 'components/Form/SubmitButton.module.scss';
import commonStyles from 'components/Form/common.module.scss';

export default function SubmitButton(props: {
  text?: string;
}): JSX.Element {
  return (
    <input type="submit" value={props.text}
           className={`${commonStyles.input} ${buttonStyles.button}`}
    />
  );
}
