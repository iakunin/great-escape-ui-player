import React, {Component, MouseEventHandler, useState} from 'react';
import styles from './Navigation.module.scss';
import {Link, NavLink} from 'react-router-dom';
import {Routes} from 'enums/Routes';
import ReactPopup from 'reactjs-popup';

export default function Navigation(): JSX.Element {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const links = (): Array<JSX.Element> => (
    [
      {to: Routes.Home, title: 'Квесты'},
      {to: Routes.Faq, title: 'FAQ'},
      {to: Routes.Contacts, title: 'Контакты'},
    ].map((link, idx) => (
      <NavLink exact key={idx} to={link.to} activeClassName={styles.active}
               component={CustomNavLink} onClick={() => setPopupOpen(false)}
      >
        {link.title}
      </NavLink>
    ))
  );

  return (
    <>
      <nav className={styles.main}>
        <ul className={styles.list}>
          {links()}
        </ul>
      </nav>

      <button className={styles.burger} onClick={() => setPopupOpen(true)}/>

      <ReactPopup open={isPopupOpen} closeOnDocumentClick onClose={() => setPopupOpen(false)}
                  overlayStyle={{background: 'rgba(0,0,0,0.85)'}}
                  contentStyle={{margin: '25% auto', height: 'fit-content'}}
      >
        <nav className={styles.mainPopup}>
          <ul className={styles.listPopup}>
            {links()}
          </ul>
        </nav>
      </ReactPopup>
    </>
  );
}

class CustomNavLink extends Component<{
  href: string;
  className?: string;
  onClick?: MouseEventHandler;
}> {
  render = (): JSX.Element => (
    <li className={this.props.className ?? ''}>
      <Link to={this.props.href} onClick={this.props.onClick}>{this.props.children}</Link>
    </li>
  );
}
