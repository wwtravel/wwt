import { prisma } from "@/utils/prisma";
import { auth } from "./auth";

export const handlePrismaError = (err: any) => {
    switch (err.code) {
        case 'P2002':
            // handling duplicate key errors
            return Response.json({ msg: `Duplicate field value: ${err.meta?.target}` }, {status: 400})
        case 'P2014':
            // handling invalid id errors
            return Response.json({ msg: `Invalid ID: ${err.meta?.target}` }, {status: 400})

        case 'P2003':
            // handling invalid data errors
            return Response.json({ msg: `Invalid input data: ${err.meta?.target}` }, {status: 400})
            
        case 'P2025':
            // handling invalid data errors
            return Response.json({ msg: `User with this email not found` }, {status: 400})

        default:
            // handling all other errors
            return Response.json({ msg: `Something went wrong: ${err.message} ${err.code}` }, {status: 500})
    }
};

export const checkIfAdmin = async () => {
    const session = await auth();

    if (!session) {
        return Response.json({ msg: "You must be logged in!"}, {status: 401});
    }

    if (!session.user?.email) {
        return Response.json({ msg: "Email not found in session!"}, {status: 400});
    }

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email
        },
        select: {
            role: true
        }
    });

    if (user?.role !== "ADMIN") {
        return Response.json({ msg: "You are not authorized to be here!"}, {status: 403});
    }
    
    return null;
}

export const checkAvailableSeats = async ({travel_id}: {travel_id: string}) => {
    let travel = null;

    try {
        travel = await prisma.travel.findUnique({
            where: {
                id: travel_id
            },
            include: {
                orders: {
                    select: {
                        id: true
                    }
                },
                route: {
                    select: {
                        bus: {
                            select: {
                                nr_of_seats: true
                            }
                        }
                    }
                }
            },
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!travel) return Response.json({ msg: "Travel not found!"}, {status: 400});

    if (travel.route.bus.nr_of_seats - travel.reserved_seats - travel.orders.length <= 0) return Response.json({ msg: "No seats available for this route!"}, {status: 400});

    return true;
}