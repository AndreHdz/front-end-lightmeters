"use client"
import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import { Button } from "../../../components/ui/Button";

async function getData(page, q, year, month){
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res =  await fetch(`${apiUrl}/api/invoices?limit=15&page=${page}&q=${q}&year=${year}&month=${month}`);
  const data = await res.json();
  return data;
}

const Page = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(page, q, year, month);
      setData(res);
      setTotalPages(Math.ceil(res.totalResults / 15));
    }
    fetchData();
  }, [page, q, year, month]);

  const nextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Recibos de Luz</h1>
      <div className="mb-3 flex gap-3">
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          className="border-2 border-solid border-[#000] rounded-md p-2"
        />
        <select value={year} onChange={(e) => setYear(e.target.value)} className="border-2 border-solid border-[#000] rounded-md p-2">
          <option value="">Seleccione Año</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="border-2 border-solid border-[#000] rounded-md p-2">
          <option value="">Seleccione Mes</option>
          <option value="01">Enero</option>
          <option value="02">Febrero</option>
          <option value="03">Marzo</option>
          <option value="04">Abril</option>
          <option value="05">Mayo</option>
          <option value="06">Junio</option>
          <option value="07">Julio</option>
          <option value="08">Agosto</option>
          <option value="09">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <DataTable data={data.data} columns={columns} />
      <div className="mt-5">
        <Button onClick={prevPage} disabled={page === 1}>Anterior</Button> 
        Página {page} de {totalPages} 
        <Button onClick={nextPage} disabled={page === totalPages}>Siguiente</Button>
      </div>
    </div>
  );
}

export default Page;
