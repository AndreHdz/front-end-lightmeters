import { useState } from "react"


export const useEnergy = () => {


    const [totalEnergy, setTotalEnergy] = useState(0)


    const getAllApartmentsEnergy = async (date) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const today = new Date(date);    
        today.setDate(today.getDate() - 1);
        const yesterday = new Date(today).toISOString().split('T')[0];

      
        const apartments = await fetch(`${apiUrl}/api/apartments`)
        const apartmentsData = await apartments.json();
      
        const allData = []

        let total = 0
        
        for(let i = 0; apartmentsData.length > i; i++){
          const apartment = apartmentsData[i];
          const res = await fetch(`${apiUrl}/api/apartments/${apartment.id}/get-energy?startDate=${yesterday}&endDate=${date}`);
          const data = await res.json();

            total += data.energy.total;
          allData.push({apartment_number: data.apartmentInfo[0].apartment_number, apartment_owner: data.apartmentInfo[0].apartment_owner, total_energy: data.energy.total})
        }

        setTotalEnergy(parseFloat(total).toFixed(2))

        console.log(totalEnergy)

        allData.sort((a,b) => b.total_energy - a.total_energy)
      
        return (allData)
    }


    return { getAllApartmentsEnergy, totalEnergy }

}