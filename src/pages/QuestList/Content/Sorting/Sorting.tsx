import React, {useState} from "react";
import styles from "./Sorting.module.scss";
import {useDispatch} from "react-redux";
import {Direction} from "../../../../api/getQuestList";
import {setDiscountInPercentsSort, setMinPriceSort} from "../../../../redux/questListRequest.slice";

type OptionalDirection = Direction | undefined;

export default function Sorting() {

  const [priceOrder, setPriceOrder] = useState<OptionalDirection>(undefined);
  const [discountOrder, setDiscountOrder] = useState<OptionalDirection>(undefined);

  const dispatch = useDispatch();

  const handlePriceClick = (): void => {
    const next = nextDirection(priceOrder);
    setPriceOrder(next);
    dispatch(setMinPriceSort(next));
  }

  const handleDiscountClick = (): void => {
    const next = nextDirection(discountOrder);
    setDiscountOrder(next);
    dispatch(setDiscountInPercentsSort(next));
  }

  const nextDirection = (current: OptionalDirection): OptionalDirection => {
    switch (current) {
      case undefined:
        return Direction.DESC;
      case Direction.DESC:
        return Direction.ASC;
      case Direction.ASC:
        return undefined;
    }
  }

  return (
    <div className={styles.sort}><span>Сортировать по:</span>
      <div className={`${styles.button} ${styles.price}`} onClick={handlePriceClick}>
        Цене
      </div>

      <div className={`${styles.button} ${styles.discount}`} onClick={handleDiscountClick}>
        Размеру скидки
      </div>
    </div>
  );
}
