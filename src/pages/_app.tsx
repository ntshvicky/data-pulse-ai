import '../styles/globals.css'            // ← adjust path if your styles folder is elsewhere
import 'bootstrap/dist/css/bootstrap.min.css'

import type { AppProps } from 'next/app'
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
