import React, {Component} from 'react';
import styles from './Navigation.module.scss';
import {Link, NavLink} from 'react-router-dom';
import {Routes} from "../../App/Routes";

export default function Navigation() {
  return (
    <nav className={styles.main}>
      <ul className={styles.list}>
        <NavLink exact to={Routes.Home} activeClassName={styles.active} component={CustomNavLink}>
          Квесты
        </NavLink>
        <NavLink exact to={Routes.Faq} activeClassName={styles.active} component={CustomNavLink}>
          FAQ
        </NavLink>
        <NavLink exact to={Routes.Contacts} activeClassName={styles.active} component={CustomNavLink}>
          Контакты
        </NavLink>
      </ul>
    </nav>
  );
}

type ComponentProps = {
  href: string;
  className?: string;
};

class CustomNavLink extends Component<ComponentProps> {
  render = (): JSX.Element => (
    <li className={this.props.className ?? ''}>
      <Link to={this.props.href}>{this.props.children}</Link>
    </li>
  );
}
