import React, {useState} from 'react';
import styles from './Slider.module.scss';

export default function Slider(params: {urls: Array<string>}): JSX.Element {

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const className = (index: number): string => (
    index === activeIndex ? styles.active : ''
  );

  const next = (): void => {
    if (activeIndex === params.urls.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prev = (): void => {
    if (activeIndex === 0) {
      setActiveIndex(params.urls.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      <div className={styles.slider}>
        {params.urls.map((url, idx) =>
          <img key={idx} src={url} alt="" className={className(idx)}/>
        )}
      </div>
      <div className={styles.controls}>
        <div className={styles.next} onClick={next}/>
        <div className={styles.prev} onClick={prev}/>
      </div>
    </>
  );
}
