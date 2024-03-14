import { ColumnDef } from "@tanstack/react-table";
import { Button } from '../../../components/ui/Button'
import Link from "next/link";

const apiUrl =  process.env.NEXT_PUBLIC_API_URL;

export const columns = [
    {
        accessorKey : "id",
        header : "ID"
    },
    {
        accessorKey : "apartment_number",
        header : "Departamento N.",
    }
    ,
    {
        accessorKey : "apartment_owner",
        header : "Dueño",
    },
    {
        accessorKey : "energy",
        header : "Consumo de Energía",
    },
    {
        accessorKey : "start_date",
        header : "Periodo"
    },
    {
        accesorKey : "id",
        header : "Decargar",
        cell : ({row}) => {
            let id = row.getValue('id');
            return <Link href={`${apiUrl}/api/invoices/${id}`} target="_blank" className="bg-[#000] text-[#fff] p-1 rounded-md"> Descargar </Link>
        }
    }
]