import React from 'react';
import styles from './Sorting.module.scss';
import {Direction} from 'api/getQuestList';
import {questListConfigMap, QuestListProps} from 'state/questList';
import {withQueryParams} from 'use-query-params';

type OptionalDirection = Direction | undefined;

function Sorting(props: QuestListProps): JSX.Element {

  const handlePriceClick = (): void => {
    const direction = nextDirection(props.query.sort?.minPrice);
    props.setQuery(direction !== undefined
      ? {sort: {minPrice: direction}}
      : {sort: undefined}
    );
  };

  const handleDiscountClick = (): void => {
    const direction = nextDirection(props.query.sort?.discount);
    props.setQuery(direction !== undefined
      ? {sort: {discount: direction}}
      : {sort: undefined}
    );
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
      <div className={className(props.query.sort?.minPrice)} onClick={handlePriceClick}>
        Цене
      </div>

      <div className={className(props.query.sort?.discount)} onClick={handleDiscountClick}>
        Размеру скидки
      </div>
    </div>
  );
}

export default withQueryParams(questListConfigMap, Sorting);
