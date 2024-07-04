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
    ,
    {
        accessorKey: "meter_type",
        header : "Tipo de Medidor"
    },
    {
        accessorKey: "serial_numbers",
        header : "Medidores"
    },

]