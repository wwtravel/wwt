import { checkIfAdmin, handlePrismaError } from "@/lib/bd-utils";
import { PatchLuggageSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma";

export async function PATCH (request: Request) {
    const response = await checkIfAdmin();
    if (response !== null) return response;
    
    const result = PatchLuggageSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    try {
        await prisma.luggagePrice.update({
            where: {
                id: result.data.id
            },
            data: {
                price: result.data.price
            }
          });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({ msg: "Price updated successfully!"}, {status: 201});
}    