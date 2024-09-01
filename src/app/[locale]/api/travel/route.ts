import { PostTravelsSchema, PatchTravelSchema } from "@/lib/types";
import { checkIfAdmin, handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function POST (request: Request) {
    // const response = await checkIfAdmin();
    // if (response !== null) return response;
    
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
                route_id: result.data.route_id
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
    const response = await checkIfAdmin();
    if (response !== null) return response;
    let travels = null;

    try {
        travels = await prisma.travel.findMany({});
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }
    return Response.json(travels, {status: 200});
}                                       