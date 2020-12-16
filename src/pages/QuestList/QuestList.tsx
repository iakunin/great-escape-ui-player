import React, {useEffect} from 'react';
import Search from "./Search";
import Content from "./Content";
import styles from "./QuestList.module.scss";
import {connect, ConnectedProps} from "react-redux";
import {AppDispatch, RootState} from "../../config/store";
import {fetchQuestList} from "../../redux/questListResponse.slice";

const connector = connect(
  (state: RootState) => ({
    request: state.questListRequest
  })
);

function QuestList(
  props: ConnectedProps<typeof connector>
): JSX.Element {

  const {dispatch, request} = props;

  useEffect(() => {
    (dispatch as AppDispatch)(fetchQuestList(request))
  }, [dispatch, request]);

  return (
    <>
      <Search/>
      <div className={styles.content}>
        <Content/>
      </div>
    </>
  );
}

export default connector(QuestList);
