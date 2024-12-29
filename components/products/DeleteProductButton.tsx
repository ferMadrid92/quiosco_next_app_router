"use client"
import { deleteProduct } from "@/actions/delete-product-action"
import { toast } from "react-toastify"
import { useState } from "react"

type DeleteProductButtonProps = {
    children: React.ReactNode
    id: number
}

export default function DeleteProductButton({children, id}: DeleteProductButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = async () => {
        const result = await deleteProduct(id)
        setShowConfirm(false)
        
        if (result?.errors) {
            toast.error('Error al eliminar el producto')
            return
        }
        
        toast.success('Producto eliminado correctamente')
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="text-red-800 hover:text-indigo-800 ml-5"
                type="button"
            >
                {children}
            </button>

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center bg-white p-6 rounded-lg shadow-xl">
                        <h3 className=" text-lg font-bold mb-4">¿Realmente deseas eliminar el producto?</h3>
                        <p className="mb-4">Esta acción no se puede deshacer.</p>
                        
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}