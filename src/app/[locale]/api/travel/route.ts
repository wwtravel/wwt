import { PostTravelsSchema, PatchTravelSchema } from "@/lib/types";
import { checkIfAdmin, handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function POST (request: Request) {
    const response = await checkIfAdmin();
    if (response !== null) return response;
    
    const result = PostTravelsSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    try {
        await prisma.travel.createMany({
            data: result.data
          });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({ msg: "Travel added successfully!"}, {status: 201});
}

export async function PATCH (request: Request) {
    const response = await checkIfAdmin();
    if (response !== null) return response;
    
    const result = PatchTravelSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    try {
        await prisma.travel.update({
            where: {
                id: result.data.id
            },
            data: {
                departure: result.data.departure,
                route_id: result.data.route_id,
                reserved_seats: result.data.reserved_seats
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({ msg: "Travel updated successfully!"}, {status: 201});
}    


export async function GET () {
    // const response = await checkIfAdmin();
    // if (response !== null) return response;
    let travels = null;

    try {
        travels = await prisma.travel.findMany({
            select: {
                id: true,
                route_id: true,
                departure: true,
                reserved_seats: true,
                orders: {
                    select: {
                        id: true
                    }
                },
                route: {
                    select: {
                        stops: true,
                        bus: {
                            select: {
                                nr_of_seats: true
                            }
                        }
                    }
                },
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!travels || travels.length === 0) return Response.json({ msg: "Travel not found!"}, {status: 400});

    const filteredTravels = new Array();

    for (const travel of travels) {
        let travelRes = JSON.parse(JSON.stringify(travel));

        let label = null;

        try {   
            label = await prisma.city.findMany({
                where: {
                    value: {
                        in: [travel.route.stops[0].city, travel.route.stops[travel.route.stops.length - 1].city]
                    }
                }
            })
        } catch (e) {
            if (e) {
                return handlePrismaError(e);
            }
        }

        if (!label) return Response.json({ msg: "Label not found!"}, {status: 400});

        const firstStop = travelRes.route.stops[0];
        const lastStop = travelRes.route.stops[travel.route.stops.length - 1];
    
        Object.assign(firstStop, { label: label.find(label => label.value === firstStop.city)?.label });
        Object.assign(lastStop, { label: label.find(label => label.value === lastStop.city)?.label });
        
        travelRes.route.stops = [firstStop, lastStop];

        const freePlaces = travel.route.bus.nr_of_seats - travel.orders.length - travel.reserved_seats;
        
        Object.assign(travelRes, {free_places: freePlaces, arrival: new Date(new Date(travel.departure).getTime() + 60 * 60 * (travel.route.stops[travel.route.stops.length - 1].hours) * 1000)});
        filteredTravels.push(travelRes);
    };

    return Response.json(filteredTravels, {status: 200});
}                                       