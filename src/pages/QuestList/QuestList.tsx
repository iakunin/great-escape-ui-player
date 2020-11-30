import React, {Component} from 'react';
import './QuestList.scss'
import Search from "./Search";
import Content from "./Content";
import {Quest} from "../../models";
import {Status} from "./Content/Content";

type ComponentProps = {
  /*_*/
};

type ComponentState = {
  status: Status
  quests: Array<Quest>;
};


export default class QuestList extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      status: Status.Loading,
      quests: [], // @TODO: here should be quest lists with default filters
    };
    this.handleQuestsChange = this.handleQuestsChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  private handleQuestsChange(quests: Array<Quest>): void {
    this.setState(() => ({
      quests: quests
    }));
  }

  private handleStatusChange(status: Status): void {
    this.setState(() => ({
      status: status
    }));
  }

  render = (): JSX.Element => (
    <>
      <Search onQuestsChange={this.handleQuestsChange} onStatusChange={this.handleStatusChange}/>
      <Content quests={this.state.quests} status={this.state.status}/>
    </>
  );
}
