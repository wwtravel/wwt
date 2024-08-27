import { handlePrismaError } from "@/lib/bd-utils";
import { SearchSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma";

export async function POST (request: Request) {
    const result = SearchSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    let travels = null;

    try {
        travels = await prisma.travel.findMany({
            where: {
                departure: {
                    gte: new Date(result.data.departure_date)
                },
                AND: [
                    {
                        route: {
                            stops: {
                                some: {
                                    city: {
                                        equals: result.data.departure_city,
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
                                        equals: result.data.arrival_city,
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                departure: true,
                route: {
                    select: {
                        stops: true,
                        bus: {
                            select: {
                                amenities: true,
                                nr_of_seats: true
                            }
                        }
                    }
                },
                reserved_seats: true,
                orders: {
                    select: {
                        id: true
                    }
                }
            },
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!travels) return Response.json({ msg: "Travel not found!"}, {status: 400});

    let price = null;

    try {   
        price = await prisma.price.findFirst({
            where: {
                OR: [
                    {
                        from: {
                            equals: travels[0].route.stops[0].country
                        },
                        to: {
                            equals: travels[0].route.stops[travels[0].route.stops.length - 1].country
                        }
                    },
                    {
                        to: {
                            equals: travels[0].route.stops[0].country
                        },
                        from: {
                            equals: travels[0].route.stops[travels[0].route.stops.length - 1].country
                        }
                    }
                ]
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!price) return Response.json({ msg: "Price not found!"}, {status: 400});

    let label = null;

    try {   
        label = await prisma.city.findMany({
            where: {
                value: {
                    in: [result.data.departure_city, result.data.arrival_city]
                }
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!label) return Response.json({ msg: "Label not found!"}, {status: 400});

    const filteredTravels = new Array();

    travels.forEach(travel => {
        const depIndex = travel.route.stops.findIndex(route => route.city === result.data.departure_city);
        const arrIndex = travel.route.stops.findIndex(route => route.city === result.data.arrival_city);

        let travelRes = {...travel};

        Object.assign(travelRes.route.stops[depIndex], {label: label.find(label => label.value === result.data.departure_city)?.label});
        Object.assign(travelRes.route.stops[arrIndex], {label: label.find(label => label.value === result.data.arrival_city)?.label});

        travelRes.route.stops = travelRes.route.stops.slice(depIndex, arrIndex + 1);
        const freePlaces = travel.route.bus.nr_of_seats - travel.orders.length - travel.reserved_seats;
        
        Object.assign(travelRes, {price: price.price_sheet, free_places: freePlaces, arrival: new Date(new Date(travel.departure).getTime() + 60 * 60 * travel.route.stops[arrIndex].hours * 1000)});
        if (depIndex < arrIndex) filteredTravels.push(travelRes);
    });

    return Response.json(filteredTravels, {status: 200});
}