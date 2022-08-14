import React from 'react';
import styles from '../styles/booking.module.css';
import { Fab } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import WhatshotIcon from '@mui/icons-material/Whatshot'; interface Ibooking {
  destroyList: any,
  setDestroyList: any
}

function booking({ destroyList, setDestroyList }: Ibooking) {
  return (
    <>
      <Tooltip title='Уничтожить все астероиды'>
        <Fab
          onClick={() => setDestroyList([])}
          color="secondary"
          style={{
            position: 'fixed',
            bottom: '8px',
            right: '8px'

          }}
        >
          < WhatshotIcon />
        </Fab>
      </Tooltip>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2>Список на уничтожение:</h2>
          <div className={styles['name-container']}>
            {destroyList.map((el: any) => {
              return (
                <span key={el.id}>{el.name}</span>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default booking;