"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({
            where: {
                id
            }
        })
        
        revalidatePath('/admin/products')
        
        return {
            success: true,
            message: 'Producto eliminado correctamente'
        }
        
    } catch (error) {
        return {
            success: false,
            errors: [{
                message: 'Error al eliminar el producto'
            }]
        }
    }
}