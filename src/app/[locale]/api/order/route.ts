import WelcomeEmail from "@/components/emails/WelcomeEmail";
import { OrderSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma"
import { render } from "@react-email/components";
import nodemailer from 'nodemailer';
import { handlePrismaError } from "@/lib/bd-utils";
import { auth } from "@/lib/auth";

const mailConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "studiomodvis@gmail.com",
        pass: process.env.EMAIL_PASSWORD
    }
};

const subjectLang = new Map([
    ["en", "REGISTRATION SUCCESSFUL | World Wide Travel"],
    ["ro", "ÎNREGISTRARE CU SUCCES | World Wide Travel"],
    ["fr", "INSCRIPTION RÉUSSIE | World Wide Travel"],
    ["ru", "РЕГИСТРАЦИЯ УСПЕШНА | World Wide Travel"]
])

export async function POST (request: Request) {
    const result = OrderSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    try {
        await prisma.order.create({
            data: {
                travel_id: result.data.travel_id,
                passengers: result.data.passengers,
                user_id: result.data.user_id,
                contact_details: result.data.contact_details
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    // const emailHtml = render(WelcomeEmail({details: {email: result.data.email, password: password, lang: result.data.lang}}))

    // const data = {
    //     to: result.data.contact_details.email, 
    //     subject: subjectLang.get(result.data.lang),
    //     html: emailHtml
    // }

    // const transporter = nodemailer.createTransport(mailConfig);
    // await transporter.sendMail(data);

    return Response.json({ msg: "Order succesfully created!" }, {status: 201});
}

// export async function PATCH (request: Request) {
//     const result = UserSchema.safeParse(await request.json());

//     if (!result.success) {
//         let errorMessage = "";

//         result.error.issues.forEach((issue) => {
//             errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
//         });


//         return Response.json({ msg: errorMessage }, {status: 400})
//     }

//     try {
//         await prisma.user.update({
//             where: {
//               email: result.data.email,
//             },
//             data: result.data,
//           })
//     } catch (e) {
//         if (e instanceof Prisma.PrismaClientKnownRequestError) {
//             return handlePrismaError(e);
//         }
//     }
    

//     return Response.json({ msg: "User updated successfully!"}, {status: 201});
// }

export async function GET () {
    const session = await auth();

    if (!session) {
        return Response.json({ msg: "You must be logged in!"}, {status: 401});
    }

    if (!session.user?.email) {
        return Response.json({ msg: "Email not found in session!"}, {status: 400});
    }

    let user = null;
    try {
        user = await prisma.user.findUnique({
            where: {
              email: session.user?.email,
            },
            select: {
             orders: true
            }
          })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!user) return Response.json({ msg: "User not found!"}, {status: 400});

    return Response.json({ msg: "User found successfully!", user: user}, {status: 201});
}