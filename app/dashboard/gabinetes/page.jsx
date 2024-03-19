/* eslint-disable @next/next/no-async-client-component */
"use client"

import { DataTable } from "../../../components/ui/data-table"
import { Gabinetes, columns } from "./columns"
import PulseCircle from "../../../components/ui/PulseCircle";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL


async function getData(){
  const res = await fetch(`${apiUrl}/api/cabinets/`);
  const data = await res.json();
  return data
}
const Page = () => {

  const [data,setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setData(res);
    }
    fetchData();
  }, [])

  if(!data){
    return 'Cargando...'
  }

  //const data = await getData();
  
  return (
    <div>
      <h1>Lista de Gabinetes</h1>
      <PulseCircle />
      <DataTable data={data}  columns={columns}/>
    </div>
  )
}

export default Page