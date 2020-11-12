import React, {Component, MouseEvent} from 'react';
import styles from './Item.module.scss'
import Button from "./Button";

type ComponentProps = {
  question: string;
  answer: string;
};

type ComponentState = {
  isOpen: boolean;
};

export default class Item extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: MouseEvent): void {
    e.preventDefault();
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render = (): JSX.Element => (
    <li>
      <div className={styles.question} onClick={this.handleClick}>
        <Button isPushed={this.state.isOpen}/>
        {this.props.question}
      </div>

      {
        this.state.isOpen &&
        <div
          className={styles.answer}
          dangerouslySetInnerHTML={{__html: this.props.answer}}
        />
      }

      <div className={styles.line}/>
    </li>
  );
}
