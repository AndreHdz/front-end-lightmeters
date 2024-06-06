"use client"

import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import { useEnergy } from "../../hooks/useEnergy"


const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses van de 0 a 11
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;

const Page = () => {

  const {getAllApartmentsEnergy, totalEnergy} = useEnergy();

  const [data,setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllApartmentsEnergy('2024-05-19');
      console.log(totalEnergy)
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