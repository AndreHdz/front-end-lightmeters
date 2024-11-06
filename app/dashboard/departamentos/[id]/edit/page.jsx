'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirección
import { Button } from '../../../../../components/ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = ({ params }) => {
  const [data, setData] = useState(null);
  const [newOwner, setNewOwner] = useState(''); // Estado para almacenar el nuevo dueño
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!params.id) return;

    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/apartments/${params.id}`);

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        setData(result.record[0]);
        setNewOwner(result.record[0].apartment_owner); // Inicializar con el dueño actual
      } catch (err) {
        toast.error("Hubo un problema al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSave = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/apartments/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apartment_owner: newOwner }) // Enviar el nuevo dueño
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      toast.success("Datos actualizados exitosamente");
      router.push('/dashboard/departamentos'); // Redirigir a /departamentos después de guardar
    } catch (err) {
      toast.error("Hubo un problema al actualizar los datos.");
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Editar dueño unidad: {data?.apartment_number}</h2>
      <div className='flex flex-col items-start gap-4 mt-4'>
        <input
          className='max-w-[400px] w-full p-2 border-2 rounded-md'
          type="text"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)} // Actualizar estado del dueño
        />
        <Button onClick={handleSave}>Guardar</Button>
      </div>
    </div>
  );
};

export default Edit;
