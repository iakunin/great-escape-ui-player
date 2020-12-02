import React from "react";
import styles from './Rating.module.scss'

export default function Rating(props: {
  votesCount: number;
  likesPercent: number;
} ) {
  return (
    <div className={styles.main}>
      <div className={styles.votesCount}>{props.votesCount}</div>
      <div className={styles.likesPercent}>
        Понравилось {props.likesPercent}%
      </div>
      <div className="clearfix"/>

      <div className={styles.minus}/>
      <div className={styles.scale}>
        <div
          className={styles.progress}
          style={{width: `${props.likesPercent}%`}}
        />
      </div>
      <div className={styles.plus}/>
    </div>
  );
}
