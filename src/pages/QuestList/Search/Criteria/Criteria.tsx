import React, {useState} from 'react';
import styles from './Criteria.module.scss'

type Button = {
  id: string;
  title: string;
}

export default function Content(props: {
  title: string;
  buttons: Array<Button>;
  onChange: (id?: string) => void;
}) {

  const [activeButton, setActiveButton] = useState<Button | undefined>(undefined);

  const handleClick = (button: Button): void => {
    const newValue = activeButton?.id !== button.id ? button : undefined;
    setActiveButton(newValue);
    props.onChange(newValue?.id);
  };

  const className = (button: Button): string => (
    button.id === activeButton?.id
      ? `${styles.button} ${styles.active}`
      : styles.button
  );

  return (
    <div className={styles.criteria}>
      <div className={styles.title}>{props.title}</div>

      {props.buttons.map((button, idx) =>
        <div key={idx} className={className(button)}
             onClick={() => handleClick(button)}
        >
          {button.title}
        </div>
      )}
    </div>
  );
}
