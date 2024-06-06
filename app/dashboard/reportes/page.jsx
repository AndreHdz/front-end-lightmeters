'use client'
import { useEffect, useState } from "react"
import { DataTable } from "../../../components/ui/data-table"
import {columns} from "./columns"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


async function getData(){
  const res = await fetch(`${apiUrl}/api/invoices/report`);
  const data = await res.json();
  return data
}

const Page = () => {

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();


  },[])
  if(!data){
    return 'Cargando...'
  }
  return (
    <div>
        <h1>Reportes Mensuales</h1>
        <DataTable data={data} columns={columns} />

    </div>
  )
}

export default Page