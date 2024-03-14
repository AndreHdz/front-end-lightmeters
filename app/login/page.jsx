"use client"
import Image from 'next/image'
import React from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"

import { Input } from "../../components/ui/input"
 
const formSchema = z.object({
  username: z.string().min(2, {message: "Username must be at least 2 characters.",}),
  password: z.string()
})

const Page = () => {

  const form = useForm({
    resolver : zodResolver(formSchema),
    defaultValues : {
      username: "",
      password: ""
    }
  })

  const handleSubmit = (values) => {
    console.log({values})

  }

  return (
    <div className='flex h-screen'>
        <div className='w-1/2 lg:w-1/3 flex items-center justify-center px-5'>
          <div className='max-w-[600px]'>
            <Image src="harbor-171-logo.svg" width={150} height={100} alt='Harbor 171 - Logo' className='mx-auto'/>
            <h1 className='text-center mt-5 mb-2'>Bienvenido a LightmetersApp</h1>
            <p className='text-center mb-7'>Ingresa tu nombre de usuario y contraseña</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}> 
                <FormField control={form.control} name="username"  render={({field}) => {
                  return <FormItem className="mb-1">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Nombre de Usuario"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                }}  
                />
                <FormField control={form.control} name="password" render={({field}) => {
                  return <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ingresa tu contraseña"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                }}  
                />
              <Button type="submit" className="mt-7 w-full">Ingresar</Button>
              </form>
            </Form>
          </div>

        </div>
        <div className='w-1/2 lg:w-2/3'>
            <Image src="/login-img.jpg" width={1920} height={1020} alt='Harbor 171' className='object-cover w-full h-full object-center' priority/>
        </div>
    </div>
  )
}

export default Page