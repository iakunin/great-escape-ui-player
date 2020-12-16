import React, {useState} from 'react';
import styles from './Criteria.module.scss';

type Button = {
  id: string;
  title: string;
};

export default function Content(props: {
  title: string;
  buttons: ReadonlyArray<Button>;
  onChange: (id?: string) => void;
}): JSX.Element {

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
             onClick={(): void => handleClick(button)}
        >
          {button.title}
        </div>
      )}
    </div>
  );
}
