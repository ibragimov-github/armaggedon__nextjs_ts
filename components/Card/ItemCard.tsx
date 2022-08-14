import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './ItemCard.module.css';
import dangerImage from '../../public/meteor_danger.svg'
import notDangerImage from '../../public/meteor_notDanger.svg'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';


interface IItemCard {
  name: string,
  danger: boolean,
  date: string,
  diameter: number,
  distance: any,
  distanceVariant: string,
  close_approach_data: any,
  destroyList: any,
  setDestroyList: any,
}

function ItemCard({ name, danger, date, diameter, distance,
  distanceVariant, close_approach_data, destroyList, setDestroyList }: IItemCard) {
  const [open, setOpen] = React.useState(false);
  const [stateButton, setStateButton] = useState(false);
  const meteorDestroyer = () => {
    setStateButton(true)
    setDestroyList([...destroyList, name])
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Астероид {name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ø {Math.floor(diameter)} м
          </DialogContentText>
          <DialogContentText>
            {distanceVariant === 'km' ? `↔ ${Math.floor(distance.kilometers)} км` : `↔ ${Math.floor(distance.lunar)} л.орбит`}
          </DialogContentText>
          <DialogContentText>
            {danger ? 'Опасен' : 'Не опасен'}
          </DialogContentText>
          <DialogContentText>Сближение с Землей:</DialogContentText>
          {close_approach_data.map((aproach: any) => {
            return (
              <ul className={styles.list} key={aproach.epoch_date_close_approach}>
                <li>
                  <DialogContentText>
                    Скорость: {Math.floor(aproach.relative_velocity.kilometers_per_second)}км/с
                  </DialogContentText>
                </li>
                <li>
                  <DialogContentText>
                    Дата сближения: {aproach.close_approach_date_full}
                  </DialogContentText>
                </li >
                <li>
                  <DialogContentText>
                    Летит вокруг: {aproach.orbiting_body}
                  </DialogContentText>
                </li>
                <li>
                  <DialogContentText>
                    Расстояние сближения: {distanceVariant === 'km' ? `${Math.floor(aproach.miss_distance.kilometers)} км` : `${Math.floor(aproach.miss_distance.lunar)} л.орбит`}
                  </DialogContentText>
                </li>
                <DialogActions>
                  <button
                    className={styles.destroy}
                    disabled={stateButton}
                    onClick={meteorDestroyer}
                  >УНИЧТОЖИТЬ</button>
                </DialogActions>
              </ul>)
          })}
        </DialogContent>
      </Dialog>
      <div className={styles.card}>
        <span className={styles.date}>{date}</span>
        <div className={styles['card-content']}>
          <Image
            src={danger ? dangerImage.src : notDangerImage.src}
            width={95}
            height={93}
          />
          <div className={styles.text}>
            <button
              className={styles.name}
              onClick={handleClickOpen}
            >Астероид {name}</button>
            <span className={styles.diameter}>Ø {Math.floor(diameter)} м</span>
            <span className={styles.distance}>{distanceVariant === 'km' ? `↔ ${Math.floor(distance.kilometers)} км` : `↔ ${Math.floor(distance.lunar)} л.орбит`}</span>
            <span className={styles.isDanger}>{danger ? 'Опасен' : 'Не опасен'}</span>
          </div>
        </div>
        <button
          className={styles.destroy}
          disabled={stateButton}
          onClick={meteorDestroyer}
        >УНИЧТОЖИТЬ</button>
      </div>
    </>
  );
}

export default ItemCard;