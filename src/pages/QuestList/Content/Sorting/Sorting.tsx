import React, {useState} from 'react';
import styles from './Sorting.module.scss';
import {connect, ConnectedProps} from 'react-redux';
import {Direction} from '../../../../api/getQuestList';
import {setDiscountSort, setMinPriceSort} from '../../../../redux/questListRequest.slice';

type OptionalDirection = Direction | undefined;

const connector = connect(
  null,
  {
    setMinPriceSort: (direction: OptionalDirection) => (setMinPriceSort(direction)),
    setDiscountSort: (direction: OptionalDirection) => (setDiscountSort(direction)),
  }
);

function Sorting(props: ConnectedProps<typeof connector>): JSX.Element {

  const [priceDirection, setPriceDirection] = useState<OptionalDirection>(undefined);
  const [discountDirection, setDiscountDirection] = useState<OptionalDirection>(undefined);

  const handlePriceClick = (): void => {
    const direction = nextDirection(priceDirection);
    setPriceDirection(direction);
    props.setMinPriceSort(direction);
  };

  const handleDiscountClick = (): void => {
    const direction = nextDirection(discountDirection);
    setDiscountDirection(direction);
    props.setDiscountSort(direction);
  };

  const nextDirection = (current: OptionalDirection): OptionalDirection => {
    switch (current) {
      case undefined:
        return Direction.DESC;
      case Direction.DESC:
        return Direction.ASC;
      case Direction.ASC:
        return undefined;
    }
  };

  const className = (direction: OptionalDirection): string => (
    direction !== undefined
      ? `${styles.button} ${styles.price} ${styles.active}`
      : `${styles.button} ${styles.price}`
  );

  return (
    <div className={styles.sort}><span>Сортировать по:</span>
      <div className={className(priceDirection)} onClick={handlePriceClick}>
        Цене
      </div>

      <div className={className(discountDirection)} onClick={handleDiscountClick}>
        Размеру скидки
      </div>
    </div>
  );
}

export default connector(Sorting);
