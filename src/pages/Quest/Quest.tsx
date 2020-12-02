import React from 'react';
import {useParams} from "react-router-dom";
import {QuestParams} from "../../enums";

export default function Quest() {
  const { slug } = useParams<QuestParams>();

  return (
    <h1>Quest Page ({slug})</h1>
  );
}