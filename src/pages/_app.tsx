import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import '../config.js'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
