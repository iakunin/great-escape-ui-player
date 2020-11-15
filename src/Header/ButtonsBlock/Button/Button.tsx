import React, {Component} from 'react';
import styles from './Button.module.scss';

type ComponentProps = {
  href: string;
  icon: string;
  text: string;
};

// @TODO: add onClick behavior
export default class Button extends Component<ComponentProps> {
  render = (): JSX.Element => (
    <a href={this.props.href} className={styles.main}>
      <div className={styles.circle}>
        <div className={styles.icon}>
          <img src={this.props.icon} alt=""/>
        </div>
      </div>
      <div className={styles.text}>{this.props.text}</div>
    </a>
  );
}
