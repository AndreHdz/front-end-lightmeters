import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LightmetersApp | Harbor 171',
  description: '',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
