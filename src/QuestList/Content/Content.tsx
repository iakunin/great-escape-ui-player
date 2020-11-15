import React, {useState} from 'react';
// @TODO: rewrite via CSS-modules
import './Content.scss'
import loadingIcon from "./images/loading.png";
import notFoundIcon from "./images/notfound.png";

enum Status {
  Loading,
  Found,
  NotFound,
}

export default function Content() {
  const [status] = useState<Status>(Status.Found);

  return (
    <div className="right_content">

      {status === Status.Found &&
      <>
        <div className="sortby"><span>Сортировать по:</span>
          <div className="button price">Цене</div>
          <div className="button sale">Размеру скидки</div>
        </div>

        <div className="quests">
          {/* @TODO: here should be quests from redux-state */}
        </div>
      </>}

      {status === Status.Loading &&
      <div className="loading">
        <img src={loadingIcon} alt="loading"/>
        <span>Мы подбираем квесты: пожалуйста, подождите</span>
      </div>}

      {status === Status.NotFound &&
      <div className="notfound">
        <img src={notFoundIcon} alt="notfound"/>
        <span>К сожалению, мы не смогли найти квест под Ваш запрос</span>
      </div>}

    </div>
  );
}
