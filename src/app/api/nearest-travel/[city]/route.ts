import { handlePrismaError } from "@/lib/bd-utils";
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


    const filteredTravels = new Array();

    travels.forEach(travel => {
        const depIndex = travel.route.stops.findIndex(route => route.city === 'chisinau');
        const arrIndex = travel.route.stops.findIndex(route => route.city === params.city);

        if (depIndex < arrIndex) filteredTravels.push(travel);
    });

    return Response.json({nearestDate: filteredTravels[0].departure}, {status: 200});
}