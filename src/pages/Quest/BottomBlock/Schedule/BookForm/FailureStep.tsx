import React from 'react';

export default function FailureStep(props: {
  details?: string,
}): JSX.Element {

  const resolveMessage = (details?: string): JSX.Element => {
    if (details) {
      return <p>{props.details}</p>;
    }

    return <>
      <p>Попробуте повторить попытку через некоторое время.</p><br/>

      <p>Если и это не помогло &mdash; обязательно сообщите нам об этом.</p>
    </>;
  };

  return (
    <>
      <p>Нам очень жаль, но забронировать квест не получилось.</p><br/>

      {resolveMessage(props.details)}
    </>
  );
}
