import React from 'react';
import Search from "./Search";
import Content from "./Content";
import styles from "./QuestList.module.scss";

export default function QuestList() {
  return (
    <>
      <Search/>
      <div className={styles.content}>
        <Content/>
      </div>
    </>
  );
}
