import React from 'react'
import { FaRegLightbulb } from "react-icons/fa";
import { BiSolidCabinet } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import { MdOutlineApartment } from "react-icons/md";





const DashboardNumbers = ({title, number, icon}) => {
  return (
    <div className='border-[1px] border-solid border-[#000] px-5 py-7 rounded-sm flex flex-col gap-3 h-full justify-center'>
        <div className='text-white bg-black w-fit text-xl p-2 rounded-md'>
            {icon === "energy" && <FaRegLightbulb />}
            {icon === "cabinet" && <BiSolidCabinet  />}
            {icon === "meter" && <SlSpeedometer  />}
            {icon === "apartment" && <MdOutlineApartment />}
        </div>
        <span className='text-3xl font-bold'>{number}</span>
        <h3>{title}</h3>
    </div>
  )
}

export default DashboardNumbers