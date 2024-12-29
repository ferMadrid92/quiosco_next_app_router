"use client"
import LatestOrderItem from "@/components/order/LatestOrderItem"
import Logo from "@/components/ui/Logo"
import { OrderWithProducts } from "@/src/types"
import path from "path"
import useSWR, { mutate } from "swr"


export default function OrdersPage() {
  const url = '/orders/api'
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
      <h1 className="text-center mt-20 text-6xl font-black">Órdenes Listas</h1>
      <Logo />
      <div className="flex justify-center">
        <button
          onClick={handleManualRefresh}
          className="bg-black w-full lg:w-auto text-xl px-10 py-3 text-center text-white font-bold cursor-pointer hover:bg-amber-400 hover:text-black mt-5"
        >
          Actualizar Órdenes
        </button>
      </div>

      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5 max-w-5xl mx-auto mt-10">
          {data.map((order) => (
            <LatestOrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center my-10">No hay Órdenes listas</p>
      )}
    </>
  );
}
