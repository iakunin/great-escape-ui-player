import React, {Component} from 'react';
import styles from './Navigation.module.scss';
import {Link, NavLink} from 'react-router-dom';
import {Routes} from 'enums/Routes';

export default function Navigation(): JSX.Element {
  return (
    <>
      <nav className={styles.main}>
        <ul className={styles.list}>
          <NavLink exact to={Routes.Home} activeClassName={styles.active} component={CustomNavLink}>
            Квесты
          </NavLink>
          <NavLink exact to={Routes.Faq} activeClassName={styles.active} component={CustomNavLink}>
            FAQ
          </NavLink>
          <NavLink exact to={Routes.Contacts} activeClassName={styles.active}
                   component={CustomNavLink}>
            Контакты
          </NavLink>
        </ul>
      </nav>
      {/* @TODO: при клике на бургер показывать боковое меню (как у https://quest.haus/) */}
      <button className={styles.burger}/>
    </>
  );
}

class CustomNavLink extends Component<{
  href: string;
  className?: string;
}> {
  render = (): JSX.Element => (
    <li className={this.props.className ?? ''}>
      <Link to={this.props.href}>{this.props.children}</Link>
    </li>
  );
}
