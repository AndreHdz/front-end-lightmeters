"use client"

import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table"
import {columns} from "./columns"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getData(){
  const res = await fetch(`${apiUrl}/api/light-meters`);
  const data = await res.json();

  const groupedByCabinet =  data.reduce((result,item) => {
    const cabinetId = item.cabinet_id;

    if(!result[cabinetId]){
      result[cabinetId] = {
        meter: [],
        count: 0
      }
    }

    result[cabinetId].meter.push(item);

    if (item.status === 1) {
      result[cabinetId].count++; // Incrementar el contador si el status es 1
    }

    return result;
  }, {})

  console.log(groupedByCabinet[1])

  return groupedByCabinet;
}

const Page = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1 className="">Lista de medidores de luz</h1>
      <div className="grid grid-cols-3 gap-10">
        {Object.entries(data).map(([cabinetId,group]) => (
          <div key={cabinetId}>
            <div className="flex items-center py-3 justify-between px-1">
              <h2 className="text-lg font-bold">Gabinete {cabinetId}</h2>
              <span className="bg-black text-white rounded-sm text-sm p-1">{group.count}/{group.meter.length}</span>
            </div>
              <DataTable data={group.meter} columns={columns} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page