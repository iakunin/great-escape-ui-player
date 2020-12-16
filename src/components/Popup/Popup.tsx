import React, {useRef} from 'react';
import styles from './Popup.module.scss';
import ReactPopup from 'reactjs-popup';
import {PopupActions} from "reactjs-popup/dist/types";

export default function Popup(props: {
  title?: string
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}): JSX.Element {

  const ref = useRef<PopupActions>(null);

  return (
    <ReactPopup ref={ref} open={props.open} closeOnDocumentClick onClose={props.onClose}
                overlayStyle={{background: 'rgba(0,0,0,0.7)'}}
    >
      <div className={styles.main}>
        <div className={styles.closeButton} onClick={(): void => ref.current?.close()}/>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.text}>{props.children}</div>
      </div>
    </ReactPopup>
  );
}
