import { ColumnDef } from "@tanstack/react-table";
import { z } from 'zod';
import PulseCircle from "../../../components/ui/PulseCircle";

export const GabinetesSchema = z.object({
    id: z.number(),
    tower: z.number(),
    level: z.number(),
    cabinet_number: z.number(),
    ip: z.string(),
    mac_address : z.string(),
    status: z.string(),
});

export const columns = [
    {
        accessorKey: "cabinet_number", 
        header: "Gabinete",
    },
    {
        accessorKey: "tower",
        header: "Torre",
    },
    {
        accessorKey: "level",
        header: "Nivel"
    },
    {
        accessorKey: "ip", 
        header: "IP"
    },
    {
        accessorKey: "mac_address", 
        header: "MAC"
    },
    {
        accessorKey: "status",
        header: "Estatus de Gabinete",
        cell : ({row}) => {
            let statusCabinet = row.getValue('status')
            if(statusCabinet == 0){
                return <PulseCircle red/>
            }else if(statusCabinet == 1) {
                return <PulseCircle green/>
            }
        }
    },
]