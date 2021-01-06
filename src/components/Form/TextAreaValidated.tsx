import React from 'react';
import commonStyles from 'components/Form/common.module.scss';
import textAreaStyles from 'components/Form/TextAreaValidated.module.scss';

export default function TextAreaValidated(props: {
  placeholder?: string;
  name?: string;
  rows?: number
  error?: string;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}): JSX.Element {
  return (
    <div className={commonStyles.fieldGroup}>
      <textarea
        className={`${commonStyles.input} ${textAreaStyles.textarea}`}
        placeholder={props.placeholder}
        rows={props.rows} name={props.name} ref={props.inputRef}
      />

      {
        props.error &&
        <div className={commonStyles.error}>{props.error}</div>
      }
    </div>
  );
}
