'use client'
import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '../../components/Navbar'
import {useSession} from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {

  const {data : session, status} = useSession();
  console.log(session,status)

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
