import { handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function GET () {

    let currencies = null;
    try {
        currencies = await prisma.currency.findMany();
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!currencies) return Response.json({msg: "Currencies not found!"}, {status: 400});

    return Response.json(currencies, {status: 201});
}