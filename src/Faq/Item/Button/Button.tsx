import React, {Component} from 'react';
import styles from './Button.module.scss'

type ComponentProps = {
  isPushed: boolean;
};

export default class Button extends Component<ComponentProps> {
  render = (): JSX.Element => (
    this.props.isPushed ?
      <div className={styles.buttonActive}>
        <div className={styles.iconActive}/>
      </div>
      :
      <div className={styles.buttonInactive}>
        <div className={styles.iconInactive}/>
      </div>
  );
}
