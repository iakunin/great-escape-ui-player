import React, {Component} from 'react';
import styles from './Criteria.module.scss'

type Button = {
  id: string,
  title: string,
}

type ComponentProps = {
  title: string,
  buttons: Array<Button>
};

type ComponentState = {
  activeButton?: Button;
};

export default class Criteria extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {activeButton: undefined};
    this.handleClick = this.handleClick.bind(this);
    this.className = this.className.bind(this);
  }

  render = (): JSX.Element => (
    <div className={styles.criteria}>
      <div className={styles.title}>{this.props.title}</div>

      {this.props.buttons.map((button, idx) =>
        <div key={idx} className={this.className(button)}
             onClick={() => this.handleClick(button)}
        >
          {button.title}
        </div>
      )}
    </div>
  );

  private handleClick(button: Button): void {
    this.setState((state) => (
      state.activeButton !== button ? {activeButton: button} : {activeButton: undefined})
    );
  }

  private className(button: Button): string {
    return button === this.state.activeButton
      ? `${styles.button} ${styles.active}`
      : styles.button;
  }
}
