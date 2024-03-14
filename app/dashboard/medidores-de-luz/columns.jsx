import { ColumnDef } from "@tanstack/react-table";
import PulseCircle from "../../../components/ui/PulseCircle";

export const columns = [
    {
        accessorKey : "serial_number",
        header : "Serial"
    },
    {
        accessorKey : "status",
        header : "Status",
        cell : ({row}) => {
            let statusCabinet = row.getValue('status')
            if(statusCabinet == 0){
                return <PulseCircle red/>
            }else if(statusCabinet == 1) {
                return <PulseCircle green/>
            }
        }
    }
]