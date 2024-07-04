"use client"

import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";


const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses van de 0 a 11
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;


async function getData(){
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${apiUrl}/api/apartments`);
  const data = await res.json();
  console.log(data);
  return data
}


const Page = () => {
  const [data,setData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  if(!data) {
    return <p>Cargando...</p>
  }



  return (
    <div>
      <h1>Lista de Departamentos</h1>
      <DataTable data={data} columns={columns}/>
    </div>
  )
}

export default Page