import React from 'react';
import styles from './SocialButtons.module.scss';

export default function SocialButtons() {
  return (
   <>
     <li>
       <a href="https://vk.com/greatescape_project">
         <span className={styles.vk}/>
       </a>
     </li>
     <li>
       <a href="https://instagram.com/greatescape_project">
         <span className={styles.instagram}/>
       </a>
     </li>
     <li>
       <a href="https://www.facebook.com/Great-Escape-Project-844307092273179">
         <span className={styles.facebook}/>
       </a>
     </li>
   </>
  );
}
