import React from 'react';
import styles from '../styles/booking.module.css';

interface Ibooking {
  destroyList: any,
  setDestroyList: any
}

function booking({destroyList, setDestroyList }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Список на уничтожение:</h2>
      </div>
    </div>
  );
}

export default booking;