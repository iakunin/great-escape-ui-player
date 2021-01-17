import React from 'react';
import buttonStyles from 'components/Form/SubmitButton.module.scss';
import commonStyles from 'components/Form/common.module.scss';
import Spinner from 'components/Spinner';

export default function SubmitButton(props: {
  text?: string;
  inProgress?: boolean;
}): JSX.Element {
  if (props.inProgress) {
    return <Spinner/>;
  }

  return (
    <input type="submit" value={props.text}
           className={`${commonStyles.input} ${buttonStyles.button}`}
    />
  );
}
