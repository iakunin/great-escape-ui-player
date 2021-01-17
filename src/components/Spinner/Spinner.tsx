import React from 'react';
import styles from './Spinner.module.scss';

// source: https://github.com/tobiasahlin/SpinKit
export default function Spinner(): JSX.Element {
  return <div className={styles.main}>
    <div className={styles.circle1}/>
    <div className={styles.circle2}/>
    <div className={styles.circle3}/>
    <div className={styles.circle4}/>
    <div className={styles.circle5}/>
    <div className={styles.circle6}/>
    <div className={styles.circle7}/>
    <div className={styles.circle8}/>
    <div className={styles.circle9}/>
    <div className={styles.circle10}/>
    <div className={styles.circle11}/>
    <div className={styles.circle12}/>
  </div>;
}
