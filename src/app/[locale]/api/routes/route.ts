import { checkIfAdmin, handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function GET () {

    let travels = null;

    try {
        travels = await prisma.route.findMany({});
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }
    return Response.json(travels, {status: 200});
}