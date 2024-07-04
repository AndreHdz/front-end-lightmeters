import { ColumnDef } from "@tanstack/react-table";
import { Button } from '../../../components/ui/Button'
import Link from "next/link";
import { FaFileZipper, FaFilePdf } from "react-icons/fa6";



const apiUrl =  process.env.NEXT_PUBLIC_API_URL;

export const columns = [
    {
        accessorKey : "id",
        header : "ID"
    },
    {
        accessorKey : "title",
        header : "Nombre",
    }
    ,
    {
        accessorKey : "formattedStartDate",
        header : "Fecha Inicio",
    },
    {
        accessorKey : "formattedEndDate",
        header : "Fecha Final",
    },
    {
        accesorKey : "id",
        header : "Decargar",
        cell : ({row}) => {
            let id = row.getValue('id');
            return (
                <div className="flex flex-col gap-2">
                    <Link href={`${apiUrl}/api/invoices/report/${id}`} target="_blank" className="bg-[#000] text-[#fff] p-1 rounded-md flex gap-2 w-fit px-3 py-1 items-center"><FaFilePdf /> Reporte</Link>
                    <Link href={`${apiUrl}/api/invoices/zip/${id}`} target="_blank" className="bg-[#000] text-[#fff] p-1 rounded-md flex gap-2 w-fit px-3 py-1 items-center"><FaFileZipper /> Zip </Link>
                </div>
            )    
        }
    }
]