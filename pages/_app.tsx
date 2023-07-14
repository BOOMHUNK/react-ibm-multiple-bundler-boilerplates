import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import '../config.js'

function MyApp ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
