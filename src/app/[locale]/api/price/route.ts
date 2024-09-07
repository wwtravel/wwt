import { PostPriceSchema, PatchPriceSchema } from "@/lib/types";
import { checkIfAdmin, handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function POST (request: Request) {
    const response = await checkIfAdmin();
    if (response !== null) return response;
    
    const result = PostPriceSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    try {
        await prisma.price.create({
            data: result.data
          });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({ msg: "Price added successfully!"}, {status: 201});
}

export async function PATCH (request: Request) {
    const response = await checkIfAdmin();
    if (response !== null) return response;
    
    const result = PatchPriceSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    try {
        await prisma.price.update({
            where: {
                id: result.data.id
            },
            data: {
                from: result.data.from,
                to: result.data.to,
                price_sheet: result.data.price_sheet
            }
          });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({ msg: "Price updated successfully!"}, {status: 201});
}    


export async function GET () {
    const response = await checkIfAdmin();
    if (response !== null) return response;
    let prices = null;

    try {
        prices = await prisma.price.findMany();
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!prices) Response.json({ msg: "Query failed!"}, {status: 500});

    return Response.json(prices, {status: 200});
}                                       