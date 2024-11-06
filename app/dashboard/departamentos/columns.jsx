import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import {z} from 'zod'


export const columns = [
    {
        accessorKey: "apartment_number",
        header : "Apartamento N."
    },
    {
        accessorKey: "apartment_owner",
        header : "Dueño"
    },
    ,
    {
        accessorKey: "meter_type",
        header : "Tipo de Medidor"
    },
    {
        accessorKey: "serial_numbers",
        header : "Medidores"
    },
    {
        accessorKey: "cabinet_ids",
        header : "Gabinete"
    },
    {
        accessorKey: "apartment_id",
        header: "Acciones",
        cell : ({row}) => {
            let id = row.getValue('apartment_id')
            return <Link href={`/dashboard/departamentos/${id}/edit`}>
                Editar
            </Link>
        }
    }

]