import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/index.module.css';
import { APIKey } from "../APIKeyNasa";
import axios from 'axios';
import ItemCard from '../components/Card/ItemCard';
import { Skeleton } from '@mui/material';
import useOnScreen from '../hooks/useOnScreen';

interface Iindex {
  baseData: Object
}

export const getStaticProps = async () => {
  let date1 = new Date()
  let date2 = new Date()
  date2.setDate(date2.getDate() + 1)
  const nowDate = date1.toISOString().split('T')[0]
  const tommorowDate = date2.toISOString().split('T')[0]
  const request = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${nowDate}&end_date=${tommorowDate}&api_key=${APIKey}`
  const response = await fetch(request);
  const data = await response.json();

  return {
    props: {
      baseData: data
    }
  }
}

function index({ baseData }: Iindex) {
  const child3Ref = useRef<HTMLDivElement>(null);
  const child3RefValue = useOnScreen(child3Ref);
  const [isChild3Ref, setIsChild3Ref] = useState(false);
  const [data, setData] = useState([]);
  let date1 = new Date();
  let date2 = new Date();
  date2.setDate(date2.getDate() + 1)
  let [startDate, setStartDate] = useState(date1.toISOString().split('T')[0])
  let endDate = date2.toISOString().split('T')[0]
  const nextDay = (day: string) => {
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    return next.toISOString().split('T')[0]
  }
  const dataLoad = (first: string, second: string) => {
    const request = `https://api.nasa.gov/neo/rest/v1/feed?start_date=
    ${first}&end_date=${second}&api_key=${APIKey}`
    axios.get(request).then((results): any => {
      const dataArray: any = Object.entries(results.data.near_earth_objects)
      setData([...data, ...Array.from(dataArray)])
      setIsChild3Ref(false)
    })
  }

  useEffect(() => {
    if (!isChild3Ref && child3RefValue) {
      setIsChild3Ref(true)
      setStartDate(nextDay(startDate));
      dataLoad(startDate, nextDay(startDate))
      // console.log(startDate)
    }
  }, [child3RefValue])
  useEffect(() => {
    dataLoad(startDate, endDate)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Ближайшие подлёты</h2>
        <div className={styles.separation}></div>
        <div className={styles.mode}>
          <span>Отображать расстояние: <button className={styles['mode-active']}>в километрах</button> | <button>в лунных орбитах</button></span>
          <div className={styles['checkbox-container']}>
            <input type="checkbox" id='chkbx' />
            <label htmlFor="chkbx">Показать только опасные</label>
          </div>
        </div>
        <div className={styles['card-container']}>
          <>
            {
              data.map((meteorList: any) => {
                return meteorList[1].map((meteor: any) => {
                  return (
                    <ItemCard
                      key={meteor.id}
                      name={meteor.name}
                    />
                  )
                })
              })
            }
            <Skeleton ref={child3Ref} width={244} height={168} />
            <Skeleton width={244} height={168} />
            <Skeleton width={244} height={168} />
            <Skeleton width={244} height={168} />
            <Skeleton width={244} height={168} />
            <Skeleton width={244} height={168} />
          </>
        </div>
      </div>
    </div>
  );
}

export default index;