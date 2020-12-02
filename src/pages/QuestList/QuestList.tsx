import React, {Component} from 'react';
import Search from "./Search";
import Content from "./Content";
import {Quest} from "../../models";
import styles from "./QuestList.module.scss";

type ComponentProps = {
  /*_*/
};

type ComponentState = {
  quests: Array<Quest>;
};

export default class QuestList extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {quests: []};
    this.handleQuestsChange = this.handleQuestsChange.bind(this);
  }

  render = (): JSX.Element => (
    <>
      <Search onQuestsChange={this.handleQuestsChange}/>
      <div className={styles.content}>
        <Content quests={this.state.quests}/>
      </div>
    </>
  );

  private handleQuestsChange(quests: Array<Quest>): void {
    this.setState(() => ({quests: quests}));
  }
}
