import React from 'react';
import styles from './Schedule.module.scss';

export default function Schedule(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.row}>

        <span className={styles.day}>Понедельник - Четверг</span>

        <div className={styles.block}>
          <div className={styles.time}>
            <div className={styles.box}>10:00</div>
            <div className={styles.box}>11:00</div>
            <div className={styles.box}>12:00</div>
            <div className={styles.box}>13:00</div>
            <div className={styles.box}>14:00</div>
            <div className={styles.box}>15:00</div>
            <div className={styles.box}>16:00</div>
            <div className={styles.box}>17:00</div>
            <div className={styles.box}>18:00</div>
            <div className={styles.box}>19:00</div>
            <div className={styles.box}>20:00</div>
            <div className={styles.box}>21:00</div>
            <div className={styles.box}>22:00</div>
            <div className={styles.box}>23:00</div>
            <div className={styles.box}>24:00</div>
          </div>
          <div className={styles.price}>
            <div className={styles.old}><span>1100 р</span></div>
            <div className={styles.new}><span>825 р</span></div>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.time}>
            <div className={styles.box}>12:00</div>
            <div className={styles.box}>13:00</div>
          </div>
          <div className={styles.price}>
            <div className={styles.old}><span>1200 р</span></div>
            <div className={styles.new}><span>900 р</span></div>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.time}>
            <div className={styles.box}>14:00</div>
          </div>
          <div className={styles.price}>
            <div className={styles.old}><span>1100 р</span></div>
            <div className={styles.new}><span>825 р</span></div>
          </div>
        </div>

      </div>

      <div className={styles.row}>
        <span className={styles.day}>Пятница и перед праздниками</span>

        <div className={styles.block}>
          <div className={styles.time}>
            <div className={styles.box}>10:00</div>
          </div>
          <div className={styles.price}>
            <div className={styles.old}><span>1100 р</span></div>
            <div className={styles.new}><span>825 р</span></div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.time}>
            <div className={styles.box}>12:00</div>
          </div>
          <div className={styles.price}>
            <div className={styles.old}><span>1200 р</span></div>
            <div className={styles.new}><span>900 р</span></div>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <span className={styles.day}>Выходные и Праздники</span>

        <div className={styles.block}>
          <div className={styles.time}>
            <div className={styles.box}>10:00</div>
          </div>
          <div className={styles.price}>
            <div className={styles.old}><span>1100 р</span></div>
            <div className={styles.new}><span>825 р</span></div>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.time}>
            <div className={styles.box}>12:00</div>
          </div>
          <div className={styles.price}>
            <div className={styles.old}><span>1105 р</span></div>
            <div className={styles.new}><span>828 р</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}
