import React, {useState} from 'react';
import styles from './Reviews.module.scss';
import {Review as ReviewModel} from 'models/Review';

const reviews = [
  {
    text: 'Сегодня были на узниках подземелья. Впечатлений море. Квест очень атмосферный, очень ' +
      'интересный, загадки все классные, для меня было как минимум 3 вау-момента, когда прямо ' +
      'прыгать хочется от оригинальности задумки. Нам квест сложным не показался: прошли ' +
      'вчетвером за 39 минут. Но мы поняли, что вчетвером гораздо быстрее идет дело, чем втроем. ' +
      'Больше людей —&gt; больше догадок, больше успеваем. Спасибо операторам, спасибо создателям ' +
      'квеста за замечательный вечер! Очень, очень рекомендую этот квест. Заряд положительных ' +
      'эмоций обеспечен!',
    author: 'Потапкин Виталий',
  }
];

const previewLength = 400;

export default function Reviews(): JSX.Element {
  return (
    <div className={styles.container}>
      {reviews.length === 0
        ? <div className={styles.notFound}>Данный раздел пока пуст</div>
        : reviews
          .map(review => ({...review, text: `«${review.text}»`}))
          .map((review, idx) => <Review key={idx} review={review}/>)
      }
    </div>
  );
}

function Review(props: { review: ReviewModel }): JSX.Element {

  const [isOpened, setOpened] = useState(false);

  const {review} = props;

  const toggleOpen = (): void => {
    setOpened(!isOpened);
  };

  return (
    <div className={styles.review}>
      <div className={styles.text}>
        {isOpened
          ? review.text
          : `${review.text.substring(0, previewLength)} ...`
        }
      </div>

      <div className={styles.button} onClick={toggleOpen}>
        <span>{!isOpened ? 'Показать больше' : 'Скрыть'}</span>
      </div>

      <div className={styles.author}>{review.author}</div>
    </div>
  );
}
