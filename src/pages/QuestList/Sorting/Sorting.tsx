import React from "react";
import styles from "./Sorting.module.scss";

export default function Sorting() {
  return (
    // @TODO: add sorting behavior
    <div className={styles.sort}><span>Сортировать по:</span>
      <div className={`${styles.button} ${styles.price}`}>Цене</div>
      <div className={`${styles.button} ${styles.discount}`}>Размеру скидки</div>
    </div>
  );
}
