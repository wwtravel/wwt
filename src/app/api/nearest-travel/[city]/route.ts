import { getOrderPrice, handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function GET (request: Request, {params}: {params: {city: string}}) {
    let travels = null;

    try {
        travels = await prisma.travel.findMany({
            where: {
                departure: {
                    gte: new Date()
                },
                AND: [
                    {
                        route: {
                            stops: {
                                some: {
                                    city: {
                                        equals: 'chisinau',
                                    }
                                }
                            }
                        }
                    },
                    {
                        route: {
                            stops: {
                                some: {
                                    city: {
                                        equals: params.city,
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                departure: true,
                route: true
            },
            orderBy: {
                departure: 'asc'
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!travels || travels.length === 0) return Response.json({ msg: "Travel not found!"}, {status: 400});

    let price = await getOrderPrice({depCountry: travels[0].route.stops[0].country, arrCountry: travels[0].route.stops[travels[0].route.stops.length - 1].country});

    if (price instanceof Response) return price;

    const filteredTravels = new Array();

    travels.forEach(travel => {
        const depIndex = travel.route.stops.findIndex(route => route.city === 'chisinau');
        const arrIndex = travel.route.stops.findIndex(route => route.city === params.city);

        Object.assign(travel, {price: price.price_sheet});

        if (depIndex < arrIndex) filteredTravels.push(travel);
    });
    return Response.json({nearestDate: filteredTravels[0].departure}, {status: 200});
}