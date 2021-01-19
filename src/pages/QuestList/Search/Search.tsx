import React from 'react';
import styles from './Search.module.scss';
import {FearLevel} from 'enums/FearLevel';
import {QuestType} from 'enums/QuestType';
import Criteria from './Criteria';
import {
  createEnumParam,
  NumberParam,
  ObjectParam,
  withDefault,
  withQueryParams
} from 'use-query-params';
import {Request, Sort} from 'api/getQuestList';
import {SetQuery} from 'use-query-params/lib/types';

const paramConfigMap = {
  fearLevel: createEnumParam<FearLevel>(Object.values(FearLevel)),
  type: createEnumParam<QuestType>(Object.values(QuestType)),
  minPrice: NumberParam,
  sort: withDefault<Sort | null | undefined, Sort | null | undefined>(
    ObjectParam,
    {},
    false
  ),
};

function Search(
  props: { query: Request, setQuery: SetQuery<typeof paramConfigMap> }
): JSX.Element {

  const onQuestTypeChange = (id?: string): void => {
    props.setQuery({type: QuestType[id as keyof typeof QuestType]});
  };

  const onFearLevelChange = (id?: string): void => {
    props.setQuery({fearLevel: FearLevel[id as keyof typeof FearLevel]});
  };

  const onMinPriceChange = (id?: string): void => {
    props.setQuery({minPrice: id !== undefined ? Number(id) : undefined});
  };

  return (
    <div className={styles.main}>

      <Criteria
        title={'Тип квеста'} onChange={onQuestTypeChange}
        buttons={[
          {id: QuestType.ESCAPE.toString(), title: 'Квест в реальности'},
          {id: QuestType.PERFORMANCE.toString(), title: 'Перформанс'},
        ]}
        activeButtonId={props.query.type?.toString()}
      />

      <Criteria
        title={'Уровень страха'} onChange={onFearLevelChange}
        buttons={[
          {id: FearLevel.ABSENT.toString(), title: 'Вообще не страшно'},
          {id: FearLevel.MINIMAL.toString(), title: 'Чуть-чуть'},
          {id: FearLevel.MODERATE.toString(), title: 'Умеренно'},
          {id: FearLevel.EXTREME.toString(), title: 'Экстримально'},
        ]}
        activeButtonId={props.query.fearLevel?.toString()}
      />

      <Criteria
        title={'Можем себе позволить'} onChange={onMinPriceChange}
        buttons={[
          {id: '1000', title: '1000 ₽'},
          {id: '2000', title: '2000 ₽'},
          {id: '3000', title: '3000 ₽'},
          {id: '4000', title: '4000 ₽'},
          {id: '5000', title: '5000 ₽'},
          {id: '6000', title: '6000 ₽'},
          {id: '7000', title: '7000 ₽'},
          {id: '8000', title: '8000 ₽'},
          {id: '9000', title: '9000 ₽'},
          {id: '999999', title: 'Больше'},
        ]}
        activeButtonId={props.query.minPrice?.toString()}
      />

    </div>
  );
}

export default withQueryParams(paramConfigMap, Search);
