import { useState } from "react"
import { formatDate } from "../../lib/formatDate"

export const useEnergy = () => {

    const [totalEnergy, setTotalEnergy] = useState(0)

    const getAllApartmentsEnergy = async (date) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
       
        
        const res = await fetch(`${apiUrl}/api/apartments/all-energy?date=${date}`);
        const data = await res.json();

        setTotalEnergy(parseFloat(data.energySum).toFixed(2))

        const sortedEnergyDifferences = data.energyDifferences.sort((a, b) => b.energy.total - a.energy.total);


        console.log(data)

      
        return (data)
    }

    return { getAllApartmentsEnergy, totalEnergy }

}