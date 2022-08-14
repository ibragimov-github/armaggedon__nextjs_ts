import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [destroyList, setDestroyList] = useState([])
  return (
    <Layout>
      <Component
        {...pageProps}
        destroyList={destroyList}
        setDestroyList={setDestroyList}
      />
    </Layout>
  )
}

export default MyApp
