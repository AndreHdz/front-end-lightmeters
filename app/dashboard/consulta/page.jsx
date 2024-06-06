"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../../components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import DashboardNumbers from "../../../components/DashboardNumbers"
import { Input } from "../../../components/ui/input"

 
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 
const formSchema = z.object({
  fechaInicio: z.string(),
  fechaFinal: z.string(),
  departamento: z.string()
})

async function getData(){
  const res = await fetch(`${apiUrl}/api/apartments/`);
  const apartmentsData = await res.json();
  return apartmentsData;
}

async function getEnergy(values){
  const res = await fetch(`${apiUrl}/api/apartments/${values.departamento}/get-energy?startDate=${values.fechaInicio}&endDate=${values.fechaFinal}`);
  const data = await res.json();
  return data
}


const Page = () => {

  const [energyData, setEnergyData] = useState(null);
  const [apartments, setApartments] = useState([]);

  const form = useForm({
    resolver : zodResolver(formSchema),
    defaultValues : {
      fechaInicio: "",
      fechaFinal: "",
      departamento: ""
    }
  })

  const handleSubmit = async (values) => {
    
    const foundApartment = apartments.find(apartment => apartment.apartment_number === values.departamento);

    if (foundApartment) {
        console.log('ID del apartamento:', foundApartment.id);
    } else {
        console.log('Apartamento no encontrado.');
    }

    try {
      const res = await fetch(`${apiUrl}/api/apartments/${foundApartment.id}/get-energy?startDate=${values.fechaInicio}&endDate=${values.fechaFinal}`);
      const data = await res.json();
      setEnergyData(data)

      console.log(data);
    } catch (error){
      console.error('Error:', error)
    }
  }

  const generateInvoice = async (energyData) => {
    try {
      const data = {
        "apartment_id": energyData.apartmentInfo[0].id,
        "energy": energyData.energy.total,
        "start_date": energyData.energy.startDate,
        "end_date": energyData.energy.endDate
      }
      const res = await fetch(`${apiUrl}/api/invoices`, {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log("recibo creado")
      form.reset({
        fechaInicio: "",
        fechaFinal: "",
        departamento: ""
      });

      setApartments([])
      setEnergyData()
    } catch(error) {
      console.error('Error al crear Recibo', error.message)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const apartments = await getData();
      setApartments(apartments);
    }
    fetchData();
  },[])

  if(!apartments){
    return "Cargando..."
  }



  return (
    <div>
      <h1>Realiza una consulta personalizada</h1>
      <div className='container grid grid-cols-2 lg:grid-cols-3 gap-10 px-0 mx-0'>
        <div className=''>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}> 
              <FormField control={form.control} name="fechaInicio" render={({field}) => {
                  return <FormItem>
                      <FormLabel>Fecha de inicio</FormLabel>
                      <FormControl>
                        <Input 
                          required
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                }}  
              />
              <FormField control={form.control} name="fechaFinal" render={({field}) => {
                return <FormItem>
                    <FormLabel>Fecha de final</FormLabel>
                    <FormControl>
                      <Input 
                        required
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              }}  
              />

              <FormField control={form.control} name="departamento" render={({field})  => {
                return <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <FormControl>
                      <Input 
                        required
                        type="input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              }}  
              />

            <Button type="submit" className="mt-7 w-full">Buscar</Button>
            </form>
          </Form>
        </div>
        <div className='h-full'>
          <DashboardNumbers number={energyData ? energyData.energy.total : "0"} title="Consumo de Energía" icon="energy"/>
        </div>
        <div className='h-full'>
          <DashboardNumbers number={energyData && energyData.apartmentInfo.length > 0 ? energyData.apartmentInfo[0].apartment_number : "0"} title={energyData && energyData.apartmentInfo.length > 0 ? energyData.apartmentInfo[0].apartment_owner : "Dueño del departamento"} icon="apartment"/>
        </div>
        <div className='col-span-3'>
          <h2 className='mb-2'>Lecturas por medidor</h2>
              <p><strong>Periodo:</strong> {energyData?.energy.startDate} a {energyData?.energy.endDate}</p>
              <p><strong>Total:</strong> {energyData?.energy.total}</p>
              <div className='flex gap-5 mt-2'>
                {energyData?.energy?.data?.map((meter, index) => (
                  <div key={index} className='border-solid border-[1px] border-[#000] rounded-md p-3 flex gap-1 flex-col'>
                    <p><strong>Medidor:</strong> {meter.lightmeterSn}</p>
                    <p><strong>Lectura {meter.energy.a.registration_date}:</strong> {meter.energy.a.energy}</p>
                    <p><strong>Lectura {meter.energy.b.registration_date}:</strong> {meter.energy.b.energy}</p>
                    <p><strong>Total:</strong> {meter.energyTotal}</p>
                  </div>
                ))}
              </div>
        </div>
      </div>

      <div>
      {
        energyData && 
          <>
            <Button className="mt-5" onClick={() => generateInvoice(energyData)}>Generar Recibo</Button>
          </>
        
      }

      </div>


  
    </div>
  )
}

export default Page