import React from 'react';

export default function FailureStep(props: {
  details?: string,
}): JSX.Element {

  return (
    <>
      <p>Нам очень жаль, но при бронировании квеста произошла ошибка.</p><br/>

      {
        props.details &&
        <><p>{props.details}</p><br/></>
      }

      <p>Попробуте повторить попытку через некоторое время.</p><br/>

      <p>Если и это не помогло &mdash; обязательно сообщите нам об этом.</p>
    </>
  );
}
