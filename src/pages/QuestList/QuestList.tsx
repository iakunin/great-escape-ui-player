import React from 'react';
import Search from './Search';
import Content from './Content';
import styles from './QuestList.module.scss';
import Sorting from './Sorting';

export default function QuestList(): JSX.Element {
  return (
    <>
      <Search/>
      <Sorting/>
      <div className={styles.content}>
        <Content/>
      </div>
    </>
  );
}
