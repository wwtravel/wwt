import { handlePrismaError } from "@/lib/bd-utils";
import { SearchSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma";

interface FindTravelInterface {
    departure_city: string,
    arrival_city: string,
    date: string
}

export async function POST (request: Request) {
    const result = SearchSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";
 
        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });

        return Response.json({ msg: errorMessage }, {status: 400})
    }

    const toures = await findTravel({
        departure_city: result.data.departure_city,
        arrival_city: result.data.arrival_city,
        date: result.data.departure_date,
    });

    let return_toures: Response | any [] = [];

    if (result.data.return_date !== undefined) {
        return_toures = await findTravel({
            departure_city: result.data.arrival_city,
            arrival_city: result.data.departure_city,
            date: result.data.return_date,
        });
    }

    return Response.json({toures: toures, return_toures: return_toures}, {status: 200});
}

const findTravel = async (data: FindTravelInterface) => {
    let travels = null;

    try {
        travels = await prisma.travel.findMany({
            where: {
                departure: {
                    gte: new Date(data.date)
                },
                AND: [
                    {
                        route: {
                            stops: {
                                some: {
                                    city: {
                                        equals: data.departure_city,
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
                                        equals: data.arrival_city,
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
        console.log("Inside RouteSearch > travel err: ", e)
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!travels || travels.length === 0) return Response.json({ msg: "Travel not found!"}, {status: 400});

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
        console.log("Inside RouteSearch > price err: ", e)
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
                    in: [data.departure_city, data.arrival_city]
                }
            }
        })
    } catch (e) {
        console.log("Inside RouteSearch > label err: ", e)
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!label) return Response.json({ msg: "Label not found!"}, {status: 400});

    const filteredTravels = new Array();

    travels.forEach(travel => {
        const depIndex = travel.route.stops.findIndex(route => route.city === data.departure_city);
        const arrIndex = travel.route.stops.findIndex(route => route.city === data.arrival_city);

        let travelRes = JSON.parse(JSON.stringify(travel));

        Object.assign(travelRes.route.stops[depIndex], {label: label.find(label => label.value === data.departure_city)?.label});
        Object.assign(travelRes.route.stops[arrIndex], {label: label.find(label => label.value === data.arrival_city)?.label});

        travelRes.route.stops = travelRes.route.stops.slice(depIndex, arrIndex + 1);
        const freePlaces = travel.route.bus.nr_of_seats - travel.orders.length - travel.reserved_seats;
        
        Object.assign(travelRes, {price: price.price_sheet, free_places: freePlaces, arrival: new Date(new Date(travel.departure).getTime() + 60 * 60 * (travel.route.stops[arrIndex].hours - travel.route.stops[depIndex].hours) * 1000)});
        if (depIndex < arrIndex) filteredTravels.push(travelRes);
    });

    return filteredTravels;
}