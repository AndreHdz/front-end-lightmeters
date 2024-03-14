import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '../../components/Navbar'

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
        <div className='flex gap-5'>
          <Navbar />
          <div className='overflow-y-scroll w-full p-10 max-h-screen overflow-x-clip'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
