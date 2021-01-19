import {
  createEnumParam,
  InjectedQueryProps,
  NumberParam,
  ObjectParam,
  withDefault
} from 'use-query-params';
import {FearLevel} from 'enums/FearLevel';
import {QuestType} from 'enums/QuestType';
import {Sort} from 'api/getQuestList';

export const questListConfigMap = {
  fearLevel: createEnumParam<FearLevel>(Object.values(FearLevel)),
  type: createEnumParam<QuestType>(Object.values(QuestType)),
  minPrice: NumberParam,
  sort: withDefault<Sort | null | undefined, Sort | null | undefined>(
    ObjectParam,
    {},
    false
  ),
};

export type QuestListConfigMap = typeof questListConfigMap;

export type QuestListProps = InjectedQueryProps<QuestListConfigMap>;
