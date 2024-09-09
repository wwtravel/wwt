import WelcomeEmail from "@/components/emails/WelcomeEmail";
import { PostUserSchema, PatchUserSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma"
import { render } from "@react-email/components";
import crypto from "crypto";
import { hash } from "bcrypt";
import nodemailer from 'nodemailer';
import { handlePrismaError } from "@/lib/bd-utils";
import { auth } from "@/lib/auth";

const mailConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
}; 

const subjectLang = new Map([
    ["en", "REGISTRATION SUCCESSFUL | World Wide Travel"],
    ["ro", "ÎNREGISTRARE CU SUCCES | World Wide Travel"],
    ["fr", "INSCRIPTION RÉUSSIE | World Wide Travel"],
    ["ru", "РЕГИСТРАЦИЯ УСПЕШНА | World Wide Travel"]
]);

export async function POST (request: Request) {
    const result = PostUserSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    const password = crypto.randomBytes(3).toString('hex');
    const hashedPassword = await hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                firstname: result.data.firstname,
                lastname: result.data.lastname,
                email: result.data.email,
                password: hashedPassword
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    const emailHtml = render(WelcomeEmail({details: {email: result.data.email, password: password, lang: result.data.lang, link: process.env.URL}}))

    const data = {
        to: result.data.email, 
        subject: subjectLang.get(result.data.lang),
        html: emailHtml
    }

    const transporter = nodemailer.createTransport(mailConfig);
    await transporter.sendMail(data);

    return Response.json({ msg: "User succesfully created!" }, {status: 201});
}

export async function PATCH (request: Request) {
    const result = PatchUserSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    try {
        await prisma.user.update({
            where: {
              email: result.data.email,
            },
            data: result.data,
          })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }
    

    return Response.json({ msg: "User updated successfully!"}, {status: 201});
}

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
                firstname: true,
                lastname: true,
                email: true,
                dob: true,
                phone_number: true,
                orders: {
                    select: {
                        passengers: {
                            select: {
                                price: true
                            }
                        },
                        departure_place: true,
                        arrival_place: true,
                        order_date: true,
                        public_id: true,
                        travel: {
                            select: {
                                route: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
          })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!user) return Response.json({ msg: "User not found!"}, {status: 400});

    return Response.json(user, {status: 200});
}