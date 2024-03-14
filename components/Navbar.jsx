"use client"
import Image from "next/image"
import Link from "next/link"
import logo from "../public/harbor-171-logo.svg"
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import { BiSolidCabinet } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import { FaGear } from "react-icons/fa6";
import { IoReader } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { Icon } from "react-icons";
import path from "path";

const data = [
  {
    title: "Dashboard",
    href: "/dashboard/home",
    icon : <AiTwotoneDashboard /> 
  },
  {
    title: "Consulta",
    href: "/dashboard/consulta",
    icon : <FaFileCircleQuestion /> 
  },
  {
    title: "Recibos",
    href: "/dashboard/recibos-de-luz",
    icon : <BsFillLightningChargeFill />
  },
  {
    title: "Departamentos",
    href: "/dashboard/departamentos",
    icon : <MdApartment /> 
  },
  {
    title: "Medidores",
    href: "/dashboard/medidores-de-luz",
    icon : <SlSpeedometer /> 
  },
  {
    title: "Gabinetes",
    href: "/dashboard/gabinetes",
    icon : <BiSolidCabinet /> 
  },

]






const Navbar = () => {
  const pathname = usePathname();


  return (
    <div className="bg-[#eaeaea] pl-8 pr-20 h-screen pt-8 relative">
        <Link href="/dashboard/home">
            <Image src={logo} width={160} height='auto' alt="Harbor 171 Logo" priority/>
        </Link>
        <div className="flex flex-col gap-2 mt-6 font-medium">
          {
            data.map((menu) => {
              const isActive =  pathname.startsWith(menu.href);
              return(
                <Link  key={menu.title} href={menu.href} className={`flex items-center gap-2 py-2 px-3 rounded-md ${isActive ? "bg-[rgba(0,0,0,.11)]" : null}`}>{menu.icon} {menu.title}</Link>
              )
            })
          }
            <div className="flex flex-col gap-1 absolute bottom-10">
              <div>
                <Link href="/dashboard/configuraciones" className="flex items-center gap-1 bg-[rgba(0,0,0)] text-white rounded-md py-2 px-4 w-full"><FaGear /> Configuraciones</Link>
              </div>
              <div>
                <Link href="/dashboard/configuraciones" className="flex items-center gap-1 bg-[rgba(0,0,0)] text-white rounded-md py-2 px-4 w-full"><IoLogOut /> Log Out</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar