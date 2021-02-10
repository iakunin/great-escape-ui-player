import React from 'react';
import styles from './Header.module.scss';
import Navigation from './Navigation';
import Logo from './Logo';

export default function Header(): JSX.Element {
  return (
    <div className={styles.main}>
      <Logo/>
      <Navigation/>
      {/*<ButtonsBlock/>*/}
    </div>
  );
}
