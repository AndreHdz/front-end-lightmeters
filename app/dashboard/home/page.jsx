"use client"
import { useEffect, useState } from "react";
import DashboardNumbers from "../../../components/DashboardNumbers"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {formatDate} from '../../../lib/formatDate'
import { useEnergy } from "../../hooks/useEnergy";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const options = {
  //responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
    },
  },
};


const today = new Date();
const date = formatDate(today);
//const date = '2024-05-15'


async function getData(){
  const res = await fetch(`${apiUrl}/api/readings/get-energy-apartments?date=${date}`);
  const data = await res.json();
  return data
}

async function getLightMeters(){
  const lightMeters = await fetch(`${apiUrl}/api/light-meters/`);
  const data = await lightMeters.json();
  const filteredLightMeters = data.filter(meter => meter.status === 1);
  return {
    allMeters: data.length,
    activeMeters : filteredLightMeters.length
  };
}

async function getCabinets(){
  const cabinets = await fetch(`${apiUrl}/api/cabinets/`);
  const data = await cabinets.json();
  const activeCabinets = data.filter(cabinet => cabinet.status === 1);
  return {
    allCabinets : data.length,
    activeCabinets : activeCabinets.length
  }
}

async function getEnergy(){
  const data = await fetch(`${apiUrl}/api/readings/get-energy?date=${date}`);
  const readings =  await data.json();
  const totalEnergy = readings.reduce((total,reading) => total + reading.energy, 0);
  const formatedEnergy = totalEnergy.toFixed(2);
  console.log(totalEnergy);
  return formatedEnergy;
}

async function getLastDaysEnergy(today){
  const dates = [];
  const energys = [];
  for(let i = 0; i < 7; i++){
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const formatedDate = formatDate(date)
    const data = await fetch(`${apiUrl}/api/apartments/all-energy?date=${formatedDate}`)
    const readings = await data.json();
    dates.push(formatedDate);
    energys.push(readings.energySum)
  }
  return {dates, energys}
}



const Page = () => {

  const { allData, totalEnergy, getAllApartmentsEnergy } = useEnergy();
  


  const [data, setData] = useState(null);
  const [lightMeters, setLightMeters] = useState(null);
  const [cabinets, setCabinets] = useState(null);
  const [lastDaysEnergy, setLastDaysEnergy] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllApartmentsEnergy(date);
      const lightMeters = await getLightMeters();
      const cabinets = await getCabinets();
      const last7DaysEnergy = await getLastDaysEnergy(date);
      
      setData(result);
      setLightMeters(lightMeters)
      setCabinets(cabinets)
      setLastDaysEnergy(last7DaysEnergy)
    };

  
    fetchData();
  },[])

  const dataChart = {
    labels : lastDaysEnergy?.dates ,
    datasets: [
      {
        label: 'Kw total por día',
        data: lastDaysEnergy?.energys,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      }
    ]
  };

  if(!data || !lightMeters || !cabinets){
    return "Cargando..."
  }

  return (
    <div>
      <h1>{`Dashboard - Medidores de Luz - ${date}`}</h1>
      <div className="grid grid-cols-4 gap-10">
        <DashboardNumbers number={`${totalEnergy}kw`} title="Consumo de energía total" icon="energy" />
        <DashboardNumbers number={`${cabinets.activeCabinets}/${cabinets.allCabinets}`} title="Estatus de Gabinetes" icon="cabinet" />
        <DashboardNumbers number={`${lightMeters.activeMeters}/${lightMeters.allMeters}`} title="Estatus de medidores" icon="meter" />
        <DashboardNumbers number={`${data[0].total_energy}kw - ${data[0].apartment_number}`} title="Consumo más alto" icon="energy" />
      </div>
      <div className="flex gap-10 mt-10">
        <div className="w-2/3 border-[1px] border-solid border-black rounded-md p-5">
          <h2>Consumo últimos 7 días</h2>
          <div className="h-[500px]">
            <Bar options={options} data={dataChart} className=""/>
          </div>
        </div>
        <div className="w-1/3 border-[1px] border-solid border-black rounded-md p-5">
          <h2>Consumo de apartamentos</h2>
          <div className="overflow-y-scroll max-h-[30rem] mt-2">
            {
              data.map((item) => (
                <div key={item.id} className="flex p-2 bg-[rgba(0,0,0,0.1)] rounded-md mb-3 mr-3">
                  <div className="flex flex-col w-2/3">
                    <div className="font-bold">
                      {item.apartment_number}
                    </div>
                    <div>
                      {item.apartment_owner}
                    </div>
                  </div>
                  <div className="w-1/3 text-center flex items-center justify-center">
                    <span>{`${item.total_energy} kw`}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page