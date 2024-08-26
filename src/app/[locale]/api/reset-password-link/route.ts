import ResetPasswordLink from "@/components/emails/ResetPasswordLink";
import { handlePrismaError } from "@/lib/bd-utils";
import { ResetPasswordSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma";
import { render } from "@react-email/components";
import nodemailer from 'nodemailer';

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
    ["en", "CHECK EMAIL | World Wide Travel"],
    ["ro", "VERIFICARE EMAIL | World Wide Travel"],
    ["fr", "VERIFIER L'EMAIL | World Wide Travel"],
    ["ru", "ПРОВЕРИТЬ ЭЛЕКТРОННУЮ ПОЧТУ | World Wide Travel"]
])

export async function POST (request: Request) {
    const result = ResetPasswordSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    let token = null;

    try {
        token = await prisma.token.create({
            data: {
                email: result.data.email,
                lang: result.data.lang,
               expiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!token) return Response.json({ msg: "Token not found" }, {status: 500});

    const emailHtml = render(ResetPasswordLink({details: {email: result.data.email, lang: result.data.lang, link: `${process.env.URL}/api/reset-password/${token?.id}`}}))

    const data = {
        to: result.data.email, 
        subject: subjectLang.get(result.data.lang),
        html: emailHtml
    }

    const transporter = nodemailer.createTransport(mailConfig);
    await transporter.sendMail(data);

    return Response.json({ msg: "Email with reset link successfully sent!" }, {status: 201});
}
