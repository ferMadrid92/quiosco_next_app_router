"use client"
import OrderCard from "@/components/order/OrderCard"
import Heading from "@/components/ui/Heading"
import { OrderWithProducts } from "@/src/types"
import useSWR, { mutate } from "swr"


export default function OrdersPage() {
  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  const handleManualRefresh = () => {
    mutate(url)
  }

  if(isLoading) return <p>Cargando...</p>

  if(error) return <p>Ha ocurrido un error</p>

  if(data) return (
    <>
      <Heading>Administrar Órdenes</Heading>
      <button
        onClick={handleManualRefresh}
        className="bg-black w-full lg:w-auto text-xl px-10 py-3 text-center text-white font-bold cursor-pointer hover:bg-amber-400 hover:text-black"
      >
        Actualizar Órdenes
      </button>
      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 gap-5 mt-5">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay órdenes pendientes</p>
      )}
    </>
  );
}

