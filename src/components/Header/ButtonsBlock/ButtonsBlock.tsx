import React from 'react';
import styles from './ButtonsBlock.module.scss';
import cabinetIcon from './images/cabinet.png';
import logoutIcon from './images/logout.png';
import loginIcon from './images/login.png';
import registrationIcon from './images/registration.png';
import subscriptionIcon from './images/subscription.png';
import Button from './Button';

export default function ButtonsBlock(): JSX.Element {
  const isLoggedIn = false;

  const buttons: JSX.Element[] =
    isLoggedIn ?
      [
        <Button icon={cabinetIcon} text={'Кабинет'} href={'/cabinet'}/>,
        <Button icon={logoutIcon} text={'Выход'} href={'#'}/>,

        <Button icon={loginIcon} text={'Вход'} href={'#'}/>,
        <Button icon={registrationIcon} text={'Регистрация'} href={'#'}/>,
      ]
      : [
        <Button icon={subscriptionIcon} text={'Подписаться'} href={'#'}/>,
      ];

  return (
    <nav className={styles.main}>
      <ul>
        {buttons.map((button, idx) =>
          <li key={idx}>{button}</li>
        )}
      </ul>
    </nav>
  );
}
