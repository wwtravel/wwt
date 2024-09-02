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
        console.log("Inside RouteSearch > travel err: ", e)
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
                    in: [result.data.departure_city, result.data.arrival_city]
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

//     const filteredTourTravels = new Array();
//     const filteredReturnTravels = new Array();

//     // Process each travel
// travels.forEach(travel => {

//     console.log(travel.route.stops[0])

//     let depIndex = travel.route.stops.findIndex(route => route.city === result.data.departure_city);
//     let arrIndex = travel.route.stops.findIndex(route => route.city === result.data.arrival_city);

//     if (depIndex !== -1 && arrIndex !== -1) {
//         let travelRes = { ...travel };

//         // Assign labels
//         Object.assign(travelRes.route.stops[depIndex], { label: label.find(label => label.value === result.data.departure_city)?.label });
//         Object.assign(travelRes.route.stops[arrIndex], { label: label.find(label => label.value === result.data.arrival_city)?.label });

//         // Handle tour trips (depIndex < arrIndex)
//         if (depIndex < arrIndex) {
//             travelRes.route.stops = travelRes.route.stops.slice(depIndex, arrIndex + 1);

//             const freePlaces = travel.route.bus.nr_of_seats - travel.orders.length - travel.reserved_seats;

//             // Check if hours is defined before using it
//             const lastStop = travelRes.route.stops[travelRes.route.stops.length - 1];
//             if (lastStop.hours !== undefined) {
//                 const hours = lastStop.hours;
//                 const arrivalTime = new Date(new Date(travel.departure).getTime() + 60 * 60 * hours * 1000);
//                 Object.assign(travelRes, { price: price.price_sheet, free_places: freePlaces, arrival: arrivalTime });
//                 filteredTourTravels.push(travelRes);
//             } else {
//                 console.error("Hours property is undefined for the last stop:", lastStop);
//             }
//         } 
//         // Handle return trips (depIndex > arrIndex)
//         else {
//             travelRes.route.stops = travelRes.route.stops.slice(arrIndex, depIndex + 1).reverse();

//             const freePlaces = travel.route.bus.nr_of_seats - travel.orders.length - travel.reserved_seats;

//             // Check if hours is defined before using it
//             const lastStop = travelRes.route.stops[travelRes.route.stops.length - 1];
//             const firstStop = travelRes.route.stops[0]
//             if (lastStop.hours !== undefined) {
//                 const hours = firstStop.hours;
//                 const arrivalTime = new Date(new Date(travel.departure).getTime() + 60 * 60 * hours * 1000);
//                 Object.assign(travelRes, { price: price.price_sheet, free_places: freePlaces, arrival: arrivalTime, hours: hours });
//                 filteredReturnTravels.push(travelRes);
//             } else {
//                 console.error("Hours property is undefined for the last stop:", lastStop);
//             }
//         }
//     } else {
//         console.error("Departure or arrival city not found in the stops.");
//     }
// });

// console.log("Tour routes: ", filteredTourTravels);
// console.log("Return routes: ", filteredReturnTravels);

// // Return separate responses if needed
// return Response.json({
//     tour: filteredTourTravels,
//     retour: filteredReturnTravels
// }, { status: 200 });
// }

const filteredTravels = new Array();

    travels.forEach(travel => {
        const depIndex = travel.route.stops.findIndex(route => route.city === result.data.departure_city);
        const arrIndex = travel.route.stops.findIndex(route => route.city === result.data.arrival_city);

        const hours = travel.route.stops[arrIndex].hours
        let travelRes = {...travel};

        Object.assign(travelRes.route.stops[depIndex], {label: label.find(label => label.value === result.data.departure_city)?.label});
        Object.assign(travelRes.route.stops[arrIndex], {label: label.find(label => label.value === result.data.arrival_city)?.label});

        travelRes.route.stops = travelRes.route.stops.slice(depIndex, arrIndex + 1);
        const freePlaces = travel.route.bus.nr_of_seats - travel.orders.length - travel.reserved_seats;

        
        Object.assign(travelRes, {price: price.price_sheet, free_places: freePlaces, arrival: new Date(new Date(travel.departure).getTime() + 60 * 60 * hours * 1000)});
        if (depIndex < arrIndex) filteredTravels.push(travelRes);
    });

    console.log(filteredTravels)

    return Response.json(filteredTravels, {status: 200});
}
