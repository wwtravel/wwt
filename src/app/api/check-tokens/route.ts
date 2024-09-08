import { handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";

export async function GET () {
    try {
        await prisma.token.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({msg: "Deleted expired dates!"}, {status: 200});
}