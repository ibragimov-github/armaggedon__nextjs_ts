import React from 'react';
import styles from './ItemCard.module.css';

interface IItemCard {
  name: string,
}

function ItemCard({ name }: IItemCard) {

  return (
    <div className={styles.card}>
      <span className={styles.date}>{name}</span>
      <div className={styles['card-contend']}>
        <div className={styles.ico}></div>
        <div className={styles.text}>
        </div>
      </div>
    </div>

  );
}

export default ItemCard;