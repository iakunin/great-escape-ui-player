import React from 'react';
import styles from './TopRightMenu.module.scss'
import cabinetIcon from './icons/cabinet.png';
import logoutIcon from './icons/logout.png';
import loginIcon from './icons/login.png';
import registrationIcon from './icons/registration.png';
import subscriptionIcon from './icons/subscription.png';
import Button from "./Button";

export default function TopRightMenu() {
  const isLoggedIn: boolean = false;

  const buttons: JSX.Element[] =
    isLoggedIn ?
      [
        <Button icon={cabinetIcon} text={"Кабинет"} href={"/cabinet"}/>,
        <Button icon={logoutIcon} text={"Выход"} href={"#"}/>,
      ]
      : [
        <Button icon={loginIcon} text={"Вход"} href={"#"}/>,
        <Button icon={registrationIcon} text={"Регистрация"} href={"#"}/>,
        <Button icon={subscriptionIcon} text={"Подписка"} href={"#"}/>,
      ];

  return (
    <nav className={styles.main}>
      <ul>
        {buttons.map(button =>
          <li>{button}</li>
        )}
      </ul>
    </nav>
  );
}
