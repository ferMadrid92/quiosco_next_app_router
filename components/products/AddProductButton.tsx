"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)

  return (
    <button
      type="button"
      className="bg-yellow-400 hover:bg-yellow-500 text-black w-full p-3 uppercase font-bold cursor-pointer  transition-colors"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  )
}
