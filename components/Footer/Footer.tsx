import React from 'react';
import styles from './Footer.module.css';

function Footer({ }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <span>2022 © Все права и планета защищены</span>
      </div>
    </footer>
  );
}

export default Footer;