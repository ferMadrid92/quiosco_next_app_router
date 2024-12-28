import { prisma } from "@/src/lib/prisma";

export async function GET() {
    const orders = await prisma.order.findMany({
        take: 5, // Limit to 5 orders - adjust as needed
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy: {
            orderReadyAt: 'desc'
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return Response.json(orders)
}