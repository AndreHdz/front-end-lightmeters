import { ColumnDef } from '@tanstack/react-table'
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
    {
        accessorKey: "total_energy",
        header : "Última lectura"
    }
]