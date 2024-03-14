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


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

import { Input } from "../../../components/ui/input"
import Inovice from '../../../components/Inovice'

 
const formSchema = z.object({
  fechaInicio: z.string(),
  fechaFinal: z.string(),
  departamento: z.string()
})

async function getData(){
  const res = await fetch("http://localhost:4321/api/apartments/");
  const apartmentsData = await res.json();
  return apartmentsData;
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
    console.log(values)
    try {
      const res = await fetch(`http://localhost:4321/api/apartments/${values.departamento}/get-energy?startDate=${values.fechaInicio}&endDate=${values.fechaFinal}`);
      const data = await res.json();
      setEnergyData(data)
      console.log(data);
    } catch (error){
      console.error('Error:', error)
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
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              }}  
              />
              <FormField control={form.control} name="departamento" render={({field}) => {
                return <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el departamento"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {apartments.map((depa) => {
                          return(
                            <SelectItem key={depa.id} value={depa.id}>{`${depa.apartment_number} - ${depa.id}`}</SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
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
      </div>

      <div>

      </div>


  
    </div>
  )
}

export default Page