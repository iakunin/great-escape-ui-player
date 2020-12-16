import React from 'react';
import {useParams} from 'react-router-dom';
import {QuestParams} from 'enums/Routes';

export default function Quest(): JSX.Element {
  const { slug } = useParams<QuestParams>();

  return (
    <h1>Quest Page ({slug})</h1>
  );
}
