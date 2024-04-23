import NavBar from '@/components/Layout/NavBar'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className='relative'><div className="fixed inset-0 h-fit z-50"><NavBar /></div>
    <div className="relative z-10 mt-16"></div>
    <Component {...pageProps} />
  </div>
}
