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
import { isToday } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses van de 0 a 11
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;
console.log(date);

export const dataChart = {
  labels,
  datasets: [
    {
      label: 'Kw total por día',
      data: [10,50,20,60,60,100,200],
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    }
  ]
};

async function getData(){
  const res = await fetch(`http://localhost:4321/api/readings/get-energy-apartments?date=${date}`);
  const data = await res.json();
  return data
}

async function getLightMeters(){
  const lightMeters = await fetch("http://localhost:4321/api/light-meters/");
  const data = await lightMeters.json();
  const filteredLightMeters = data.filter(meter => meter.status === 1);
  return {
    allMeters: data.length,
    activeMeters : filteredLightMeters.length
  };
}

async function getCabinets(){
  const cabinets = await fetch("http://localhost:4321/api/cabinets/");
  const data = await cabinets.json();
  const activeCabinets = data.filter(cabinet => cabinet.status === 1);
  return {
    allCabinets : data.length,
    activeCabinets : activeCabinets.length
  }
}

async function getEnergy(){
  const data = await fetch(`http://localhost:4321/api/readings/get-energy?date=${date}`);
  const readings =  await data.json();
  const totalEnergy = readings.reduce((total,reading) => total + reading.energy, 0);
  const formatedEnergy = totalEnergy.toFixed(2);
  console.log(totalEnergy);
  return formatedEnergy;
}

const Page = () => {

  const [data, setData] = useState(null);
  const [lightMeters, setLightMeters] = useState(null);
  const [cabinets, setCabinets] = useState(null);
  const [energy, setEnergy] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      const lightMeters = await getLightMeters();
      const cabinets = await getCabinets();
      const energy = await getEnergy();
      setEnergy(energy);
      setData(result);
      setLightMeters(lightMeters)
      setCabinets(cabinets)
    };

    fetchData();
  },[])

  if(!data || !lightMeters || !cabinets || !energy){
    return "Cargando..."
  }

  return (
    <div>
      <h1>Dashboard - Medidores de Luz</h1>
      <div className="grid grid-cols-4 gap-10">
        <DashboardNumbers number={`${energy}kw`} title="Consumo de energía total" icon="energy" />
        <DashboardNumbers number={`${cabinets.activeCabinets}/${cabinets.allCabinets}`} title="Estatus de Gabinetes" icon="cabinet" />
        <DashboardNumbers number={`${lightMeters.activeMeters}/${lightMeters.allMeters}`} title="Estatus de medidores" icon="meter" />
        <DashboardNumbers number={`${data[0].total_energy}kw - ${data[0].apartment_number}`} title="Consumo más alto" icon="energy" />
      </div>
      <div className="flex gap-10 mt-10">
        <div className="w-2/3 border-[1px] border-solid border-black rounded-md p-5">
          <h2>Consumo últimos 7 días</h2>
          <Bar options={options} data={dataChart} />
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