import React from 'react';
import styles from './Header.module.scss';
import Navigation from "./Navigation";
import Logo from "./Logo";
import ButtonsBlock from "./ButtonsBlock";

export default function Header() {
  return (
    <div className={styles.main}>
      <Logo/>
      <Navigation/>
      <ButtonsBlock/>
    </div>
  );
}
