/* eslint-disable @next/next/no-async-client-component */
"use client"

import { DataTable } from "../../../components/ui/data-table"
import { Gabinetes, columns } from "./columns"
import PulseCircle from "../../../components/ui/pulseCircle";
import { useEffect, useState } from "react";
async function getData(){
  const res = await fetch('http://localhost:4321/api/cabinets/');
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