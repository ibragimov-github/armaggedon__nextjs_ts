import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { APIKey } from '../../APIKeyNasa';
import axios from 'axios';
function Header({ }) {
  const { pathname } = useRouter();
  const [backgroundData, setBackgroundData] = useState('');
  useEffect(() => {
    const link = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}`
    axios.get(link).then((res: any) => axios.get(res.config.url).then((res: any) => {
      console.log(res)
      setBackgroundData(res.data.hdurl)
    }))
  }, [])
  return (
    <header
      style={{
        backgroundImage: `url(${backgroundData})`
      }}
      className={styles.header}
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>ARMAGGEDON V2</h1>
          <h3>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</h3>
        </div>
        <nav className={styles.nav}>
          <Link href="/">
            <a className={pathname === '/' ? styles.active : ''}>Астероиды</a>
          </Link>
          <Link href="/booking">
            <a className={pathname === '/booking' ? styles.active : ''}>Заказ</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;