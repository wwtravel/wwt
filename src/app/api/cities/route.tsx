import { handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function GET () {
    let cities = null;

    
    try {
        cities = await prisma.city.findMany({
            select: {
                value: true,
                label: true
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json(cities, {status: 200});
}