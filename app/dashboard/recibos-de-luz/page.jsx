"use client"
import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table"
import { columns } from "./columns"
import { Button } from "../../../components/ui/Button";




async function getData(page){
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res =  await fetch(`${apiUrl}/api/invoices?limit=15&page=${page}`);
  const data = await res.json();
  return data
}

const Page = () => {
  const [data,setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(page);
      setData(res)
      setTotalPages(Math.ceil(res.totalResults / 15));
      console.log(res)
    }
    fetchData();

  }, [page])

  const nextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages))
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1), 1)
  }

  if(!data){
    return <p>Cargando...</p>
  }

  return (
    <div>
      <h1>Recibos de Luz</h1>
      <DataTable data={data.data} columns={columns} />
      <div className="mt-5">
        <Button onClick={prevPage} disabled={page == 1}>Anterior</Button> Pagina {page} de {totalPages} <Button onClick={nextPage} disabled={page == totalPages}> Siguiente</Button>
      </div>
    </div>
  )
}

export default Page