"use client"
import { useRouter } from "next/navigation"

export default function GoBackButton() {
    const router = useRouter()
  return (
    <button
        onClick={() => router.back()}
        className="bg-black w-full lg:w-auto text-xl px-10 py-3 text-center text-white font-bold cursor-pointer hover:bg-amber-400 hover:text-black"
    >Regresar</button>
  )
}
