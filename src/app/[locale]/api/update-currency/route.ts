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

    for (const currency of currencies) {
        const acceptableUpdateDate = new Date(currency.last_update).getTime() + 60 * 60 * 23 * 1000;
        const currentDate = new Date().getTime();
        if (currentDate < acceptableUpdateDate) break;

        const ratesRes = await fetch('https://open.er-api.com/v6/latest/EUR');
        const ratesResJson = await ratesRes.json();

        try {
            currencies = await prisma.currency.update({
                where: {
                    title: currency.title
                },
                data: {
                    value: Number(ratesResJson.rates[currency.title].toFixed(2))
                }
            });
        } catch (e) {
            if (e) {
                return handlePrismaError(e);
            }
        }
    }

    return Response.json({msg: "Currency was updated!"}, {status: 201});
}